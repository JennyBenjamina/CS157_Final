module.exports = (req, res, next) => {
  if(req.user){
    if(req.user.role == "admin"){
      next();
    }else{
      res.status(400).send("Unauthorized Access!");
    }
  }else{
    res.status(400).send("Unauthenticated user!");
  }
}