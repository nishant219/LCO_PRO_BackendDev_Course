var format = require('date-format');
const express=require("express");
const app=express();

//swagger doc related stuff
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const PORT= process.env.PORT||4000;


app.get("/",(req, res)=>{
res.status(200).send("Hello Buddy");
});


app.get("/api/v1/instagram",(req, res)=>{
    const insta={
        username:"nishant",
        followers:50,
        follows:50,
        date: format.asString("hh:mm:ss", new Date()),
    };
    res.status(200).json(insta);
});


app.get("/api/v1/twitter",(req, res)=>{
    const twitter={
        username:"nishant",
        followers:500,
        follows:500,
        date:format.asString("dd[MM]- hh:mm:ss", new Date()),
    };
    res.status(200).json(twitter);
});


app.get("/api/v1/linkedin",(req, res)=>{
    const linkedin={
        username:"nishant",
        followers:5000,
        follows:5000,
        date:format.asString('hh:mm:ss.SSS', new Date()),
    };
    res.status(200).json(linkedin);
});


//this route returns token or other stuff from url
app.get("/api/v1/:token",(req, res)=>{
    console.log(req.params.token);
    res.status(200).json({param: req.param.token});
});



app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
});

