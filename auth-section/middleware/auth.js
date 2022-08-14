// mongoose helps us to write schema and helps us to store them in db as well 
// mongoose gives us 2 types of middlewares --> 1)pre 2)post  --> Life Cycle Hooks

// Token -> Header, Payload, signature

const jwt =require("jsonwebtoken");

const auth=(req, res, next)=>{

    //to grab token // hunt token from multiple places ( ||  || )
    const token =  req.cookies.token || req.body.token ||  req.header('Authorization').replace('Bearer ', '')  ;
       
    if(!token){
        return res.status(403).send("token is missing")
    }
//verify token in try
    try{
const decode = jwt.verify(token, process.env.SECRET_KEY)
console.log(decode);    
}catch(error){
return res.status(401).send('Invalid Token');
    }

return next(); 
}

module.exports =auth;