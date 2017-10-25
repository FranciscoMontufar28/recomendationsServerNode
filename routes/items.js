var express = require("express");
var router = express.Router();


router.get("/", (req, res, next) => {

    let idusuario = req.query.idusuario;
    let aisleone = req.query.aisleone;
    let aisletwo = req.query.aisletwo;

    res.send({ idusuario: idusuario, aisleone: aisleone, aisletwo: aisletwo });

});


router.get("/:id", (req, res, next) => {

    let id = req.params.id;
    if (id === 1) {
        res.send({ item: id });
    } else {
        res.status(404)
            .send({ err: "Item no encontrado" });
    }

});

router.post("/",(req,res,next)=>{
    let item = req.body;
    res.send({Success:true, item:item});
});


router.put("/:id",(req,res,next)=>{
    let id = req.params.id;
    let item = req.body;
    res.send({Success:true, id:id, itemupdate:item});
});

router.delete("/:id", (req,res,next)=>{
    let id = req.param.id;
    res.send({Success:true, Deleted:id})

});
module.exports = router;