const express = require("express");
const app = express();
const mongoose = require("mongoose")
const testController = require("./router/testController")
const hostname = "127.0.0.1";
const port = 3000;
const DB_URI = "mongodb://127.0.0.1:27017/mongodb";

const server = async() => {
    try{
        await mongoose.connect(DB_URI);
        app.use(express.json());
        app.use("/test", testController);
        app.listen(port, hostname, function () {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }catch(err){
       console.log(err);
    }
}

server();
