const express = require('express');
const app = express();
const ehbs = require('express-handlebars');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const { send } = require('express/lib/response');
require('dotenv').config({path: ".env"});


app.engine('hbs', ehbs.engine({ extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: false}));

//TWILIO Config==============================================
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const receiverNumber = process.env.myNumber;
const senderNumber = process.env.twilioNumber;

var client = new twilio(accountSid, authToken); 
//==========================================================

const port = 8080;

app.get('/', (req, res) => {
    res.render('home', {layout: false}); //           :D
});

app.post('/home', async (req,res) =>{
    client.messages.create({
        to: receiverNumber,
        from: senderNumber,
        body: "Message: " + req.body.message,
    });
})

app.listen(port, () => {
    console.log('App ON at port: ' + port);
})