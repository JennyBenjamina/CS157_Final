const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("authorization");

  if(authHeader){
    try{
      const authArray = authHeader.split(" ");
      if(authArray[0].toLowerCase() == "bearer"){
        const token = authArray[1]; 
        //if the token is the same as the original, it will be returned to payLoad
        //if verify token is not the same token, it will raise an error. That is why we put it in a try catch block.
        const payLoad = jwt.verify(token, process.env.JWTKEY || "12345678");
        //req.{whatever you want to call it} <- you are storing it in the request object
        //the above object can be accessed with the req object
        req.user = payLoad;
        next();
      }else{
        res.status(401).send("Access Denied! Authorization type not supported");
      }
    }catch{
        res.status(401).send("Access Denied! Must be logged in!");
    }
  }else{
    res.status(401).send("No authorization!");
  }
}
