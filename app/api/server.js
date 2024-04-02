const cors = require('cors')
const express = require('express');
var bodyParser = require('body-parser')

const { connectToDatabase } = require("./database/db");
const userRoutes =  require("./v1/routes/user/signup")

const app = express();

connectToDatabase()


//middleware 
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next()
})
app.use(cors())
app.use(bodyParser.json());

// routes
app.use("/user",userRoutes)


app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});