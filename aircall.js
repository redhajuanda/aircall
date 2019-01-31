const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
const model = require('./model');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.info("This is root of our server");
    res.json({ 'message': 'Server is running' });
});

app.post('/aircall/call', (req, res) => {

    if (req.body.event && req.body.event === 'call.created') {
        if (req.body.data.direction === 'inbound') {
            let phone = req.body.data.raw_digits;
            console.log(`Penelpon : ${phone}`);
            //
            if (phone != '+62 822-1803-3368') {
                res.sendStatus(200);
                console.log('Real People');
            }

            model.getEmailConsultant(phone)
                .then((email) => {
                    // res.send(email);
                    console.log(email);
                    return model.getIdAircallConsultant(email);
                })
                .then((data) => {
                    // console.log(data.id);
                    // res.status(200).send(data.id.toString());

                    const callId = req.body.data.id;
                    const consultantId = data.id.toString();
                    console.log(`Call Id : ${callId}`);
                    console.log(`Consultant Id : ${consultantId}`);
                    console.log(`Email  : ${data.email}`);
                    return model.forwardCall(callId, consultantId);
                })
                .then((forward) => {
                    if (forward.statusCode === 204) {
                        console.log(forward);
                    }

                })
                .catch((error) => {
                    console.log(`Error : ${error}`);
                    res.sendStatus(200);
                });
        }
        else {
            console.info('Event direction non-handled:', req.body.data.direction);
        }
    }
    else {
        console.info('Event non-handled');
    }
    res.sendStatus(200)
})

app.listen(port, () => console.log('Were live on port ' + port));
