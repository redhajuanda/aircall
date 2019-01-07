const request   = require('request');
const config    = require('./config');

module.exports = function escrow (error, response, body){
    if(!error && response.statusCode === 200){
        console.log("Auth Success");
        // Get Data 
        const sf = require('node-salesforce')
        const conn = new sf.Connection()

        conn.login(config.SF_USERNAME, config.SF_PASSWORD,(err, userInfo) => {
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
                    console.log(insert_va(element,body.access_token));
                    
                });
                res.send('Ok')
            })
        })
    }
    else{
        console.log("Auth Gagal");
        res.send(error)
    }
}

// module.exports = escrow;

function insert_va(element, access_token){
    const createvaparams = {
        url: config.BASE_URL+'/v1/api/productcreation/va/createva',
        body: {
            "UserReferenceNumber": "1200123456784321",
            "RequestTime": request_date,
            "VirtualAccountNumber": element.Name,
            "VirtualAccountName": element.Contact__r.Full_Name__c,
            "VirtualAccountExpiryDate": expire_date
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
        console.log(element.Name +' => '+response.statusCode)
        console.log(body);
    })
}

// Function Date

const request_date = new Date();
console.log(formatDate(request_date));

const expire_date = new Date();
expire_date.setDate(expire_date.getDate()+7);
console.log(formatDate(expire_date));

function formatDate(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getFullYear()+''
    + pad(d.getMonth()+1)+''
    + pad(d.getDate())+''
    + pad(d.getHours())+''
    + pad(d.getMinutes())+''
    + pad(d.getSeconds())+''
}