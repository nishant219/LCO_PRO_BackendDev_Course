const mongoose=require("mongoose");
const { MONGODB_URL }=process.env

//mongoose.connect('mongodb://localhost:27017/myapp');

exports.connect =()=>{
    try{
    mongoose.connect(MONGODB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
        console.log(`DB Connected Successfully`);
    }
    
    catch (error) {
        console.log(`DB Connection Failed`);
        console.log(error);
        process.exit(1);
      }
}



// exports.connect =()=>{
//     mongoose.connect(MONGODB_URL , {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }).then(
//     console.log(`DB Connected Successfully`);
//     ).catch((error)=>{
//         console.log(`DB Connection Failed`);
//         console.log(error);
//         process.exit(1);
//     });
// }



//------connection to atlas DB---------

// const Connection = async (DB_USERNAME, DB_PASSWORD) => {
//     try {
//       const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@clone-inshort.ixttsgn.mongodb.net/INSHORT-CLONE?retryWrites=true&w=majority`;
//       // mongoose.connect(URL,{});
//       await mongoose.connect(URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log("Database connected successfully");
//     } catch (error) {
//       console.log("Error while connecting to DB", error);
//     }
//   };