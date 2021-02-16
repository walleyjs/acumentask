var mongoose = require("mongoose");
// const Schema = mongoose.Schema;
var todoSchema = new mongoose.Schema({
    subject: String,
    date: String,
    todo:String
});



module.exports = mongoose.model("Todo", todoSchema);