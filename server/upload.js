
const path = require('path'); 
const aws = require('aws-sdk');
const env = require('../server/s3.env.js');
const fs = require('fs');
const faker = require('faker');
const https = require('https');
const Stream = require('stream').Transform;
const request = require('request');

aws.config.update({  
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region : env.REGION,
}); 

var s3 = new aws.S3(); 

function getImage (url, filename,callback) {
   request({url:url,encoding:null}, (err,res,body) => {
        if (err) { 
            console.log("failed to get image",err);
        } else {
            s3.putObject({
                Body: body,
                Key: filename,
                Bucket: 'scarflysdc',
                ContentType: 'image/jpeg',
                ACL: 'public-read'
            }, (error, data)=> { 
                if (error) {
                    console.log("error downloading image to s3");
                    callback(err)
                } 
            }); 
        } 
    })  
};

for(var i=1; i<=1000; i++) {
    var image  = "https://source.unsplash.com/random/?dish"
    getImage(image, `food/${i}.png` ,(err,data)=> {
        if (err) {
            console.log('Error:',err)
        }  else {
            console.log('data upload.')
        }
    });
};

// for(var i=1; i<=500; i++) {
//     var image  = "https://source.unsplash.com/random/?avatar"
//     getImage(image, `user/${i}.png` ,(err,data)=> {
//         if (err) {
//             console.log('Error:',err)
//         }  else {
//             console.log('data upload.')
//         }
//     });
// };