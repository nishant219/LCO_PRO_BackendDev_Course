require("dotenv").config();
require("./config/database.js");
const express = require("express");
const app = express();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


require("./config/database").connect(); //call connect method to connect with db
// Connection();

const User = require("./model/user.js");
const auth = require("./middleware/auth.js");

//we can not read cookies directly so we have cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//as express cannot handle json data directly we have to pass middleware
app.use(express.json());
// for any incomming request objects of json format are made parsable and understandable
// for the nodejs program using only this middleware


//
app.get("/", (req, res) => {
  res.send("<h1>Hello bud</h1>");
});


//
//route for registering user
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    //here the validation part...we can use mongoose for val or by done it manually
    if (!(email && password && firstname && lastname)) {
      res.status(400).send("All fields are required");
    }
    //for existing user
    const existingUser = await User.findOne({ email }); //promise or try catch block (some optimization)
    //if user present
    if (existingUser) {
      res.status(401).send("User already exists");
    }
    //encryption of password
    const EncryPassword = await bcrypt.hash(password, 10); //(pass, len(no. of iterations))
    //Here we have created user
    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: EncryPassword,
    });
    //token created here
    const token = jwt.sign(
      { user_id: user._id, email }, //payload--> what info you want to pass
      process.env.SECRET_KEY, //secret or private key
      {
        expiresIn: "2h",
      } //object
    );
    //
    user.token = token;
    //to not share enncrypted pass
    user.password = undefined;
    //send token or send success msg or redirect to login page
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});


//
//To logged In user
app.post("/login", async (req, res) => {
  //use promises or try catch block while handling async-await
  try {
    const { email, password } = req.body;
    //check mail and pass present or not
    if (!(email && password)) {
      res.status(400).send("Field is missing");
    }
    //based on password we have to check whether user is present in db or not
    const user = await User.findOne({ email });

    //whtf there is no user
    // if(!user){
    // res.status(400).send("Not registered in our DB");
    // }
    //compare entered pass with pass in db
    // await bcrypt.compare(password, user.password); //bool ans

    //user present and pass also matched --> geenerate token and send it back
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );
      //send token to DB
      user.token = token;
      user.password = undefined;
      // res.status(200).json(user);
      //rather than json we are going to send cookie
      const options={
        expires: new Date(Date.now()+3*24*60*60*1000), //expires in 
        httpOnly: true, // read only in backend
      };
      //send cookie by this way
      res.status(200).cookie('token', token , options).json({
        success: true,
        token,
        user,
      })
    }
    //if user is missing and pass also
    res.status(400).send("email or pass incorrect");
  } catch (error) {
    console.log(error);
  }
});

//
//custom middleware (auth) route 
app.get("/dashboard", auth, (req, res)=>{
res.send("Welcome to Dashboard");
});

module.exports = app;
