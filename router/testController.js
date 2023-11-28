const { Router } = require("express");
const { Test } = require("../models/test");
const testRouter = Router();

testRouter.post("/", async (req, res) => {
    try {
        const {name, description} = req.body;

        const test = new Test({name, description});
        await test.save();

        return res.send({ test });
    } catch(error) {
        console.log(error);
        return res.status(500).send({error: error.message});
    }
});

module.exports = testRouter;
