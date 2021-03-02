var mongoose = require("mongoose");
// const Schema = mongoose.Schema;
var todoSchema = new mongoose.Schema({
    subject: String,
    date: String,
    todo:String,
    completed:Boolean
});



module.exports = mongoose.model("Todo", todoSchema);