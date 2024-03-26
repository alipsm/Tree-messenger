const mongoose = require("mongoose");
async function connectToDatabase() {
    await mongoose.connect(
        process.env.MONGODB_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
}
module.exports={
    connectToDatabase
}