const express = require("express");
const Razorpay =require("razorpay");
const app = express();

app.use(express.static("./public"));
app.use(express.json()); //as we are receiving some stuff from body

const port = 4000;


// home route
// app.get("/", (req, res) => {
//   res.send("Hello World, Hit '/orders' route ...");
// });


//orders route
app.post("/orders", async (req, res) => {   //post route 

  const amount = req.body.amount;  //we received amount only //amount that we want to deduct 

  var instance = new Razorpay({   //instance of Razorpay to verify
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });


  var options={       //provide some options (lots of options are present) 1st 2 are req minimum
    amount: amount*100,
    currency: "INR",
    receipt: "order_receipt_11",
  };

//   instance.orders.create({
//     amount: 50000,
//     currency: "INR",
//     receipt: "receipt#1",
//     notes: {
//       key1: "value3",
//       key2: "value2",
//     },
//   });

const myOrder=await instance.orders.create(options);  //create instance 

//info that we are sending to frontend
res.status(200).json({
    success: true,
    amount,
    order: myOrder,
});

});

app.listen(port, () => {
  console.log(`Server Running on port : ${port}`);
});
