const express = require('express');
const app = express();
const port = process.env.PORT;
const request = require('request');
const config = require('./config');
const model = require('./model');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.info("This is root of our server");
    res.json({ 'message': 'Server is running' });
});

// app.get('/aircall', (req, res) => {

//     model.getEmailConsultant("087872737764")
//         .then((email) => {
//             // res.send(email);
//             console.log(email);
//             return model.getIdAircallConsultant(email);
//         })
//         .then((data) => {
//             console.log(data.id);
//             res.status(200).send(data.id.toString());
//         })
//         .catch((error) => {
//             res.send(error);
//         });

// })

app.post('/aircall/call', (req, res) => {
    res.sendStatus(200);
    console.info(req);
    // if (req.body.event === 'call.created') {
    //     if (req.body.data.direction === 'inbound') {
    //         let phone = req.body.data.raw_digits;
    //         model.getEmailConsultant("087872737764")
    //             .then((email) => {
    //                 // res.send(email);
    //                 console.log(email);
    //                 return model.getIdAircallConsultant(email);
    //             })
    //             .then((data) => {
    //                 // console.log(data.id);
    //                 // res.status(200).send(data.id.toString());

    //                 console.log(`Transfering call`);
    //                 const callId = req.body.data.id;
    //                 const consultantId = data.id.toString();
    //                 console.log(`Call Id : ${callId}`);
    //                 console.log(`Consultant Id : ${consultantId}`);
    //                 res.status(200).send('Aircall Ok')
    //                 // return model.forwardCall(callId, consultantId);
    //             })
    //             .catch((error) => {
    //                 res.send(error);
    //             });
    //     }
    //     else {
    //         console.info('Event direction non-handled:', req.body.data.direction);
    //     }
    // }
    // else {
    //     console.info('Event non-handled:', req.body.event);
    // }
})

app.get('/ping', (req, res) => {
    request.get('https://ea34f205dd5c9d6638bf194f11ec0d18:5270d0f51bd9b431a2f2e2709e2b5f85@api.aircall.io/v1/users', (error, response, body) => {
        res.send(body)
    })
})

app.listen(port, () => console.log('Were live on port ' + port));