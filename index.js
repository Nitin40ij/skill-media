const express = require('express');
const app = express();
// DOTENV for secret keys and all
require('dotenv').config();
// Port
const PORT = process.env.PORT || 5000;
// Router
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
// Body parser for json Input
const bodyParser = require('body-parser');
// connecting DB
const connect = require("./config/db");
// for storing cookies and validating them
const cookieParser = require('cookie-parser');
// cors for fetching data from frontend
var cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
connect();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", profileRoutes);
// app.get("/",(req,res)=>{
//     res.send("HHHHHHHH")
// })
// Deployment Part
const path = require("path");
if (process.env.NODE_ENV == 'production') {
    app.use(express.static("frontend/build"));
    app.get("*", function (request, response) {
        response.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})