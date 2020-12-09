const { model, Schema } = require('mongoose');

const materialSchema = new Schema({
    name: String,
    password: String,
    email: String,
    createdAt: String
});

module.exports = model("Material", materialSchema)