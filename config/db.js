const mongoose  = require('mongoose');
    // Atlas URL
// const my_db =process.env.MONGO_URL;
// Connect function for connecting into app.js
const connect = ()=>{
    const my_db="mongodb://0.0.0.0:27017/blacc_sckull";
    mongoose.connect(my_db,{
         useNewUrlParser:true,
         useUnifiedTopology:true,
    });
    const db=mongoose.connection;
    db.on('error',console.error.bind(console,"connection error:"));
    db.once('open',()=>{
        console.log("DB connected....");
    });
}
module.exports = connect;