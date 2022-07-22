const nodemailer = require('nodemailer')
const { google } = require('googleapis')

CLIENT_ID = '402491212773-bg2ie4hmkj4kf6n4b963v738bmhc1fco.apps.googleusercontent.com'
CLIENT_SECRET = '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'
REDIRECT_URI = 'https://developers.google.com/oauthplayground'
REFRESH_TOKEN = '1//04F3HjttqE-plCgYIARAAGAQSNwF-L9IrLIaaLJGiSZLWQTTJO3B0wMnJ56ibz1YKUz3kd1746H7JgTj_hrtcdN6PH7s6AEAB4OU'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function SendMail(){
    try{
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'roshniadatrao@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
            
        })

        const mailOptions = {
            from: 'Roshni# <roshniadatrao@gmail.com>',
            to: 'roshni.adatrao@bridgelabz.com',
            subject: 'Hello from gmail using API',
            text: 'Hello this is the mail from gmail using API',
            html: '<h1>Hello this is the mail from gmail using API</h1>'
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    }catch(error){
        return error
    }
}

SendMail()
.then((result) => console.log('Email Sent---->', result))
.catch((error) => console.log(error.message));