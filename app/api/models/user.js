const mongoose = require("mongoose");
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789';
const nanoid = customAlphabet(alphabet, 4);


const TodoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  quickerID:{
    type: String,
    required: true,
    default: () => nanoid(7),
    index: { unique: true },
  },
  token:{
    type:String,
    required: true,
  }
});
module.exports = mongoose.models.User || mongoose.model("User", TodoSchema);