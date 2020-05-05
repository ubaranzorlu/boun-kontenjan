const axios = require('axios');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const port = 1313;

let lectures = [
    {
        abbr: "XXX", // ÖRN: HTR
        code: "000", // 311
        section:"00", // 01
        email: "example@example.com" // E-posta bildirimlerinin gönderileceği e-posta adresi.
    }
];

let gmailCredientials = {
    user: 'example@gmail.com', // E-posta gönderimi için gmail hesabınızın bilgilerini girmelisiniz. Yeni ve boş bir e-posta adresi açmanızı öneriyorum.
    pass: 'example' // Bilgilerinizi girdikten sonra https://myaccount.google.com/lesssecureapps adresinden hesabınızı daha az güvenli uygulamalara izin verecek şekilde çalıştırmanız gerek.
}

let donem = '2019/2020-1'; // Dönem numarasını doğru girmeye özen gösteriniz.

let lectureList = '';

lectures.forEach((item,key) =>{
    key === 0 ? lectureList += item.abbr + " " + item.code + "." + item.section : lectureList += ', ' + item.abbr + " " + item.code + "." + item.section; 
});

let url = ['https://registration.boun.edu.tr/scripts/quotasearch.asp?abbr=','%20&code=','&section=','&donem='];

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: gmailCredientials
  });
  

setInterval(function(){
    lectures.forEach((item,key) =>{
      setInterval(() => {
        axios.get(url[0] + item.abbr + url[1] + item.code + url[2] + item.section + url[3] + donem).then(data => {
            let parser = "<tr class='schtd'>";
            if(item.quotaField){
                parser = item.quotaField;
            }
            let quota = parseInt(data.data.split(parser)[1].split('</tr>')[0].split("<td width='10%'><p align=center>")[1].split('&nbsp;')[0]);
            let enrolled = parseInt(data.data.split(parser)[1].split('</tr>')[0].split("<td width='10%'><p align=center>")[2].split('&nbsp;')[0]);
            console.log(item.abbr + " " + item.code + "." + item.section + " " + quota + ":" + enrolled);
            if(enrolled < quota){
                let mailOptions = {
                    from: gmailCredientials.user, 
                    to: item.email,
                    subject: item.abbr + " " + item.code + "." + item.section + " dersinde kota boşaldı! - Derse Kayıtlı: " + enrolled + " Kota: " + quota,
                    text: 'Hemen git kaydol! => https://registration.boun.edu.tr/scripts/student.asp'
                  };
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            }            
        }).catch(err => {
            console.log(err);
        });
      },3000*key);
    });
},300000);

app.get('/', (req,res) => {
    res.send('Listening for lectures: <b>' + lectureList + '</b>');
});

app.listen(port, () => console.log(`lectures happens on port ${port}!`))