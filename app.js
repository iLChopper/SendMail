var express=require('express');
var http = require('http');
var fs = require('fs');
var busboy = require('connect-busboy');
var app=express();

app.use(express.static(__dirname + '/'));
app.get('/',inicio);

function inicio (req,res) {
	res.render('index.html');
}




var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rodrigo.rodriguez09@gmail.com',
        pass: '15492102'
    }
});


var mailOptions = {
    from: 'DoctorP  <rodrigo.rodriguez09@gmail.com>', // sender address
    to: 'rodrigo.rodriguez@live.com.ar', // list of receivers
    subject: 'Confirmacion DoctorP ', // Subject line
    text: '', // plaintext body
    html: '<b>Hola </b>', // html body
    attachments: [
        {   
            filename: '',
            content: ''
        }
	]	
};







app.use(busboy()); 

app.post('/saveFile', function(req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename,encoding, mimetype) {
        console.log("Uploading: " + filename); 	
        mailOptions.attachments[0].content=file;
	      mailOptions.attachments[0].filename =filename ;
	      transporter.sendMail(mailOptions, function(error, info){
   	      if(error){
       	    console.log(error);
   	      }else{
       		  console.log('Message sent: ' + info.response);
   	     }
	   });	
    });
});


var server = http.createServer(app).listen(5000, function() {  
  console.log('Server On puerto 5000');
});