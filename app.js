const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000);
console.log('listening on port 3000!!!!');

app.get('/',function(req,res){
    res.sendFile(__dirname + '/signup.html');
});


app.post('/',function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.emailAddress;
    console.log(firstName + ' ' + lastName + ' ' + email);

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
            }
        }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/a99e3fd3d7";

    const options = {  
        method: "POST",
        auth: "akshaya:0ca874a43b8a65810406cb4ee8673cf8-us18"
     }

     const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        }else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
     })

     request.write(jsonData);
     request.end();

});

app.post('/failure', function(req, res){
    res.redirect("/");
});
