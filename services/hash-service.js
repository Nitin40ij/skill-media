const crypto = require('crypto')
// Used For OTP Verfifcation
class HashService{
    hashOtp(data){
       return crypto.createHmac('sha256',"Nitin Srivastav").update(data).digest('hex')
    }
}

module.exports = new HashService();