import dotenv from 'dotenv'
dotenv.config()

const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

export async function MailSender(EmailID, token){
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
            to: EmailID,
            subject: 'Hello from gmail using API',
            text: 'Hello this is the mail from gmail using API',
            html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/api/v1/users/${token}">click here</a></h1>`
            
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    }catch(error){
        return error
    }
}

// SendMail()
// .then((result) => console.log('Email Sent---->', result))
// .catch((error) => console.log(error.message));