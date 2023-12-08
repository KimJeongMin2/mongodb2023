const express = require("express");
const app = express();
const mongoose = require("mongoose");
const testController = require("./router/testController");
const lodgingRouter = require("./router/lodgingRouter");
const reservationRouter = require("./router/reservationRouter");
const reviewRouter = require("./router/reviewRouter");
const guestRouterRouter = require("./router/guestRouter");
const {generateLodging} = require("./faker")
const hostname = "127.0.0.1";
const port = 3000;
const DB_URI = "mongodb://127.0.0.1:27017/mongodb";

const server = async() => {
    try{
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.use(express.json());
        // app.use("/test", testController);

        app.use("/guest", guestRouterRouter);
        app.use("/lodging", lodgingRouter);
        app.use("/reservation", reservationRouter);
        app.use("/review", reviewRouter);
        app.listen(port, hostname, function () {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }catch(err){
       console.log(err);
    }
}

server();
