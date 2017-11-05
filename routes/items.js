var express = require("express");
var router = express.Router();

router.use((req, res, next) => {
    console.log("Entro en el request de items")
    next();
});

function middleware(req, res, next) {
    console.log("hola");
    next();
};

router.get("/preferences", (req, res, next) => {

     let userNameId = req.query.usernameid;
     let aisleNameOne = req.query.aislenameone;
     let aisleNameTwo = req.query.aislenametwo;
    //res.send({ idusuario: idusuario, aisleone: aisleone, aisletwo: aisletwo });

    //req.db.query("SELECT userpreferences.itemcode FROM userpreferences inner join itemslocation on itemslocation.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and (itemslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemslocation.aislelocation = "+"'"+aisleNameTwo+"'"+")) order by rand() Limit 1",(err,result)=>{
    req.db.query("SELECT userpreferences.itemcode FROM userpreferences inner join itemsfeatureslocation on itemsfeatureslocation.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and (itemsfeatureslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemsfeatureslocation.aislelocation = "+"'"+aisleNameTwo+"'"+")) order by rand() Limit 1",(err,result)=>{
        //console.log("SELECT userpreferences.itemcode FROM userpreferences inner join itemslocation on itemslocation.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and (itemslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemslocation.aislelocation = "+"'"+aisleNameTwo+"'"+")) order by rand() Limit 1");
        if(err){
            res.status(500).send("Error al consultar items");
        }else if(result.length==0){
            res.status(404).send({Err:"No se obtuvieron resultados"});

        }else{
            var itemRandom = result[0].itemcode;
            console.log("SELECT itemsfeatureslocation.nameitem as itemname,itemsfeatureslocation.description as itemdescription, itemsfeatureslocation.urlimage as itemurl, itemsfeatureslocation.sodium as itemsodium, itemsfeatureslocation.sugar as itemsugar FROM similarity inner join itemsfeatureslocation on itemsfeatureslocation.itemcode = similarity.id_second_item where similarity.id_first_item = "+itemRandom+" and similarity.coef_similarity BETWEEN 40 AND 80 and (itemsfeatureslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemsfeatureslocation.aislelocation = "+"'"+aisleNameOne+"'"+")order by rand() Limit 5");
            //req.db.query("SELECT similarity.id_second_item, itemslocation.nameitem FROM similarity inner join itemslocation on itemslocation.itemcode = similarity.id_second_item where similarity.id_first_item = "+itemRandom+" and similarity.coef_similarity > 40 and (itemslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemslocation.aislelocation = "+"'"+aisleNameOne+"'"+")order by rand() Limit 5",(error,resultrandom)=>{
            req.db.query("SELECT itemsfeatureslocation.nameitem as itemname,itemsfeatureslocation.description as itemdescription, itemsfeatureslocation.urlimage as itemurl, itemsfeatureslocation.sodium as itemsodium, itemsfeatureslocation.sugar as itemsugar FROM similarity inner join itemsfeatureslocation on itemsfeatureslocation.itemcode = similarity.id_second_item where similarity.id_first_item = "+itemRandom+" and similarity.coef_similarity BETWEEN 40 AND 80 and (itemsfeatureslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemsfeatureslocation.aislelocation = "+"'"+aisleNameOne+"'"+")order by rand() Limit 5",(error,resultrandom)=>{
                res.send(resultrandom);
            });
            
        }
    });

    

});

router.get("/morepreferred", (req, res, next) => {
    
         let userNameId = req.query.usernameid;
         let aisleNameOne = req.query.aislenameone;
         let aisleNameTwo = req.query.aislenametwo;
        //res.send({ idusuario: idusuario, aisleone: aisleone, aisletwo: aisletwo });
    
        //req.db.query("SELECT userpreferences.itemcode FROM userpreferences inner join itemslocation on itemslocation.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and (itemslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemslocation.aislelocation = "+"'"+aisleNameTwo+"'"+")) order by rand() Limit 1",(err,result)=>{
        req.db.query("SELECT userpreferences.itemcode FROM userpreferences inner join itemsfeatureslocation on itemsfeatureslocation.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and (itemsfeatureslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemsfeatureslocation.aislelocation = "+"'"+aisleNameTwo+"'"+")) order by rand() Limit 1",(err,result)=>{
            //console.log("SELECT userpreferences.itemcode FROM userpreferences inner join itemslocation on itemslocation.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and (itemslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemslocation.aislelocation = "+"'"+aisleNameTwo+"'"+")) order by rand() Limit 1");
            if(err){
                res.status(500).send("Error al consultar items");
            }else if(result.length==0){
                res.status(404).send({Err:"No se obtuvieron resultados"});
    
            }else{
                var itemRandom = result[0].itemcode;
                console.log("SELECT itemsfeatureslocation.nameitem as itemname,itemsfeatureslocation.description as itemdescription, itemsfeatureslocation.urlimage as itemurl, itemsfeatureslocation.sodium as itemsodium, itemsfeatureslocation.sugar as itemsugar FROM similarity inner join itemsfeatureslocation on itemsfeatureslocation.itemcode = similarity.id_second_item where similarity.coef_similarity = 100 and (itemsfeatureslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemsfeatureslocation.aislelocation = "+"'"+aisleNameOne+"'"+")order by rand() Limit 1");
                //req.db.query("SELECT similarity.id_second_item, itemslocation.nameitem FROM similarity inner join itemslocation on itemslocation.itemcode = similarity.id_second_item where similarity.id_first_item = "+itemRandom+" and similarity.coef_similarity > 40 and (itemslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemslocation.aislelocation = "+"'"+aisleNameOne+"'"+")order by rand() Limit 5",(error,resultrandom)=>{
                req.db.query("SELECT itemsfeatureslocation.nameitem as itemname,itemsfeatureslocation.description as itemdescription, itemsfeatureslocation.urlimage as itemurl, itemsfeatureslocation.sodium as itemsodium, itemsfeatureslocation.sugar as itemsugar FROM similarity inner join itemsfeatureslocation on itemsfeatureslocation.itemcode = similarity.id_second_item where similarity.coef_similarity = 100 and (itemsfeatureslocation.aislelocation = "+"'"+aisleNameOne+"'"+" or itemsfeatureslocation.aislelocation = "+"'"+aisleNameOne+"'"+")order by rand() Limit 1",(error,resultrandom)=>{
                    res.send(resultrandom);
                });
                
            }
        });
    
        
    
    });


router.get("/:id", middleware, (req, res, next) => {

    let id = req.params.id;
    if (id === 1) {
        res.send({ item: id });
    } else {
        res.status(404)
            .send({ err: "Item no encontrado" });
    }

});

// router.post("/", (req, res, next) => {
//     let item = req.body;
//     res.send({ Success: true, item: item });
// });


// router.put("/:id", (req, res, next) => {
//     let id = req.params.id;
//     let item = req.body;
//     res.send({ Success: true, id: id, itemupdate: item });
// });

// router.delete("/:id", (req, res, next) => {
//     let id = req.param.id;
//     res.send({ Success: true, Deleted: id })

// });
module.exports = router;