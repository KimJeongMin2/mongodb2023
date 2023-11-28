const {Schema, model} = require("mongoose");
const TestSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
    },
    {timestamps: true}
);

const Test = model("Test", TestSchema);
module.exports = {Test};
