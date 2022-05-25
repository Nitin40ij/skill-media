const hashService = require("../services/hash-service");
const smsSid =process.env.SMS_SSID;
const smsAuthToken=process.env.SMS_AUTH_TOKEN;
const SMS_FROM_NUMBER = process.env.SMS_NUMBER;
const nodemailer = require('nodemailer');
const twilio = require('twilio')(smsSid,smsAuthToken,{
    lazyLoading:true
})
// method for generating otp and sending it
// through email or phone number

class OtpService {
   async generateOtp() {
      const otp=Math.floor(Math.random() * 9999);
      console.log(otp,"Generate");
        return otp;
    }
    // sending through phone using twilio
    async sendBySms(phone, otp){
        return await twilio.messages.create({
            to: `+91${phone}`,
            from: SMS_FROM_NUMBER,
            body: `Your BlaccSckull register OTP is ${otp}`,
        });
    }
    // OTP verification
    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
    //sending by email using node mailer
    async sendByEmail(email,otp){
        console.log(process.env.SENDER_EMAIL,process.env.SENDER_PASSWORD);
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
  },
  tls:{
      rejectUnauthorized:false
  }
});

        var mailOptions = {
        from: process.env.SENDER_EMAIL ,
        to:email,
        subject: `BlaccSckull Register OTP`,
        text: `Your BlaccSckull register OTP is ${otp}`
};
try {
  const info =await transporter.sendMail(mailOptions);
  console.log(info);
} catch (error) {
    console.log(error);
    console.log(error.message,"While send email");
}
    }
}


module.exports = new OtpService();