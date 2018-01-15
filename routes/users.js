var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
  console.log("Entro en el request de items")
  next();
});

/* GET users listing. */
router.get("/user",(req,res,next)=>{
  let userNameId = req.query.usernameid;
  
  req.db.query("Select username from recomendationsdb.usercode where usercodenum ="+userNameId+"",(err, user)=>{
    console.log("Select username from recomendationsdb.usercode where usercodenum ="+userNameId+"");
    if(err){
      res.status(500).send("Error al consultar items");
    }else if(res.lenght==0){
      res.status(404).send("Usuario no encontrado");
    }else{
      res.send(user);
    }
  });

});

module.exports = router;
