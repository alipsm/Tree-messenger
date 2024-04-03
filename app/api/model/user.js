import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token:{
    type:String,
    required: true,
  }
});
module.exports = mongoose.models.User || mongoose.model("User", TodoSchema);
