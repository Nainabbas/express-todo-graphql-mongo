var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  todo: String,
  isDone: Boolean
});
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
