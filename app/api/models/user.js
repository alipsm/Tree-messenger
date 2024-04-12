const mongoose = require("mongoose");
const { generateQuickId } = require("../utils/generateQuickId");

const TodoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  quick_id:{
    type: String,
    required: true,
    default: () => generateQuickId(),
    index: { unique: true }
  },
  token:{
    type:String,
    required: true,
  }
});
module.exports = mongoose.models.User || mongoose.model("User", TodoSchema);