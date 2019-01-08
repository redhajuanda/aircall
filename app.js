const express   = require('express')
const app       = express()
const port      = process.env.PORT || 3000
const request   = require('request')
const config    = require('./config')

app.listen(port,()=> console.log('Live on PORT ' + port));

app.get('/', (req, res) =>{
   res.send('Hello World')
})

app.get('/create_va', (req, res)=>{
    const authOptions = {
        url: config.BASE_URL+'/api/oauth/token',
        form: {
            grant_type : 'client_credentials'
        },
        headers: {
            'Authorization': 'Basic '+ (new Buffer.from(config.CLIENT_ID+':'+config.CLIENT_SECRET).toString('base64'))
        },
        json: true
    }

    request.post(authOptions, (error, response, body)=>{
        if(!error && response.statusCode === 200){
            // Get Data 
            const sf = require('node-salesforce')
            const conn = new sf.Connection()

            conn.login(config.SF_USERNAME, config.SF_PASSWORD, function(err, userInfo) {
                if (err) { return console.error(err) }
                // console.log(conn.accessToken);
                // console.log(conn.instanceUrl);
                // // logged in user property
                // console.log("User ID: " + userInfo.id);
                // console.log("Org ID: " + userInfo.organizationId);    
                
                const query ='SELECT Id, Name, Contact__c, Is_Created__c, Created_Datetime__c, Escrow_Account__c.Contact__r.Full_Name__c FROM Escrow_Account__c WHERE Escrow_Account__c.Is_Created__c=false';
                conn.query(query, function(err, result) {
                    if (err) { return console.error(err); }
                    result.records.forEach(element => {
                        // Insert VA 
                        insert_va(element,body.access_token)
                    });
                    res.send('Ok')
                    // console.log( result.records)
                })
            })
        }
        else{
            res.send(error)
        }
    })
})

// Function Insert Virtual Account
function insert_va(element, access_token){
    const createvaparams = {
        url: config.BASE_URL+'/v1/api/productcreation/va/createva',
        body: {
            "UserReferenceNumber": "1200123456784321",
            "RequestTime": formatDate(request_date),
            "VirtualAccountNumber": element.Name,
            "VirtualAccountName": element.Contact__r.Full_Name__c,
            "VirtualAccountExpiryDate": formatDate(expire_date)
        },
        headers: {
            'Authorization': 'Bearer '+access_token,
            'Content-Type':'application/json',
            'BDI-Key': config.API_KEY,
            'BDI-Timestamp': config.BDI_TIMESTAMP,
            'BDI-Signature': config.BDI_SIGNATURE
        },
        json: true
    }
    request.post(createvaparams, (error, response, body)=>{
        console.log(createvaparams.body);
        console.log(element.Name +' => '+response.statusCode)
        console.log(body);
    })
}

// Function Date Formatting
const request_date = new Date();
// console.log();

const expire_date = new Date();
expire_date.setDate(expire_date.getDate()+7);
// console.log(formatDate(expire_date));

function formatDate(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getFullYear()+''
    + pad(d.getMonth()+1)+''
    + pad(d.getDate())+''
    + pad(d.getHours())+''
    + pad(d.getMinutes())+''
    + pad(d.getSeconds())+''
}