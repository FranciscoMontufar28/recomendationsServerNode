var express = require("express");
var int = require('int');
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
     let beaconIdOne = req.query.beaconidone;
     let beaconIdTwo = req.query.beaconidtwo;
    req.db.query("SELECT userpreferences.itemcode FROM userpreferences inner join featuresdb on featuresdb.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and ((featuresdb.beaconidone = "+"'"+beaconIdOne+"'"+" and featuresdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(featuresdb.beaconidone = "+"'"+beaconIdOne+"'"+" and featuresdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+"))) order by rand() Limit 1",(err,result)=>{   
        //console.log("SELECT userpreferences.itemcode FROM userpreferences inner join featuresdb on featuresdb.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and ((featuresdb.beaconidone = "+"'"+beaconIdOne+"'"+" and featuresdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(featuresdb.beaconidone = "+"'"+beaconIdOne+"'"+" and featuresdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+"))) order by rand() Limit 1");
        if(err){
            res.status(500).send("Error al consultar items primero");
        }else if(result.length==0){
            res.status(404).send({Err:"No se obtuvieron resultados"});

        }else{
            var itemRandom = result[0].itemcode;
            req.db.query("SELECT featuresdb.itemcode as itemcode, featuresdb.nameitem as itemname,featuresdb.description as itemdescription, featuresdb.urlimage as itemurl, featuresdb.sodium as itemsodium, featuresdb.sugar as itemsugar, featuresdb.promotion as promotion, featuresdb.promotiondescription as promotiondescription "+ 
            "FROM similarity inner join featuresdb on featuresdb.itemcode = similarity.id_second_item "+ 
            "where similarity.id_first_item = "+itemRandom+" and similarity.coef_similarity "+ 
            "BETWEEN 41 AND 81 and "+ 
            "((featuresdb.beaconidone = "+"'"+beaconIdOne+"'"+" and featuresdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(featuresdb.beaconidone = "+"'"+beaconIdTwo+"'"+" and featuresdb.beaconidtwo = "+"'"+beaconIdOne+"'"+"))"+
            "order by rand() Limit 1",(error,resultrandom)=>{
                console.log("SELECT featuresdb.itemcode as itemcode, featuresdb.nameitem as itemname,featuresdb.description as itemdescription, featuresdb.urlimage as itemurl, featuresdb.sodium as itemsodium, featuresdb.sugar as itemsugar, featuresdb.promotion as promotion, featuresdb.promotiondescription as promotiondescription "+ 
                "FROM similarity inner join featuresdb on featuresdb.itemcode = similarity.id_second_item "+ 
                "where similarity.id_first_item = "+itemRandom+" and similarity.coef_similarity "+ 
                "BETWEEN 41 AND 81 and "+ 
                "((featuresdb.beaconidone = "+"'"+beaconIdOne+"'"+" and featuresdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(featuresdb.beaconidone = "+"'"+beaconIdTwo+"'"+" and featuresdb.beaconidtwo = "+"'"+beaconIdOne+"'"+"))"+
                "order by rand() Limit 1");
;            //res.header("Content-Type", "application/json; charset=utf-8");
            res.send(resultrandom);
            //res.send({itemname:resultrandom.itemname, itemdescription:resultrandom.itemdescription, itemurl: resultrandom.itemurl, itemsodium: "Este producto contiene "+resultrandom.itemsodium+" mg de sodio", itemsugar:"Este producto contiene "+resultrandom.itemsodium+" mg de sodio"})
            });
            
        }
    });

    

});


router.get("/preferencespromotion", (req, res, next) => {
    
        
         let userNameId = req.query.usernameid;
         let beaconIdOne = req.query.beaconidone;
         let beaconIdTwo = req.query.beaconidtwo;
        req.db.query("SELECT userpreferences.itemcode FROM userpreferences inner join itemsfeaturesdb on itemsfeaturesdb.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and ((itemsfeaturesdb.beaconidone = "+"'"+beaconIdOne+"'"+" and itemsfeaturesdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(itemsfeaturesdb.beaconidone = "+"'"+beaconIdOne+"'"+" and itemsfeaturesdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+"))) order by rand() Limit 1",(err,result)=>{   
            if(err){
                res.status(500).send("Error al consultar items");
            }else if(result.length==0){
                res.status(404).send({Err:"No se obtuvieron resultados"});
    
            }else{
                var itemRandom = result[0].itemcode;
                req.db.query("SELECT itemsfeaturesdb.itemcode as itemcode, itemsfeaturesdb.nameitem as itemname,itemsfeaturesdb.description as itemdescription, itemsfeaturesdb.urlimage as itemurl, itemsfeaturesdb.sodium as itemsodium, itemsfeaturesdb.sugar as itemsugar, itemsfeaturesdb.promotion as promotion, itemsfeaturesdb.promotiondescription as promotiondescription "+ 
                "FROM similarity inner join itemsfeaturesdb on itemsfeaturesdb.itemcode = similarity.id_second_item "+ 
                "where similarity.id_first_item = "+itemRandom+" and similarity.coef_similarity "+ 
                "BETWEEN 41 AND 81 and itemsfeaturesdb.promotion = 'true' and "+ 
                "((itemsfeaturesdb.beaconidone = "+"'"+beaconIdOne+"'"+" and itemsfeaturesdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(itemsfeaturesdb.beaconidone = "+"'"+beaconIdTwo+"'"+" and itemsfeaturesdb.beaconidtwo = "+"'"+beaconIdOne+"'"+"))"+
                "order by rand() Limit 2",(error,resultrandom)=>{
                    //res.header("Content-Type", "application/json; charset=utf-8");
                    res.send(resultrandom);
                //res.send({itemname:resultrandom.itemname, itemdescription:resultrandom.itemdescription, itemurl: resultrandom.itemurl, itemsodium: "Este producto contiene "+resultrandom.itemsodium+" mg de sodio", itemsugar:"Este producto contiene "+resultrandom.itemsodium+" mg de sodio"})
                });
                
            }
        });
    
        
    
    });

/*router.get("/:id", middleware, (req, res, next) => {

    let id = req.params.id;
    if (id === 1) {
        res.send({ item: id });
    } else {
        res.status(404)
            .send({ err: "Item no encontrado" });
    }

});*/

router.get("/morepreferredpromotion", (req, res, next) => {
    
         let userNameId = req.query.usernameid;
         let beaconIdOne = req.query.beaconidone;
         let beaconIdTwo = req.query.beaconidtwo;
    req.db.query("SELECT itemsfeaturesdb.itemcode as itemcode, itemsfeaturesdb.nameitem as itemname,itemsfeaturesdb.description as itemdescription, itemsfeaturesdb.urlimage as itemurl, itemsfeaturesdb.sodium as itemsodium, itemsfeaturesdb.sugar as itemsugar, itemsfeaturesdb.promotion as promotion, itemsfeaturesdb.promotiondescription as promotiondescription FROM itemsfeaturesdb "+ 
            "inner join userpreferences "+ 
            "on itemsfeaturesdb.itemcode = userpreferences.itemcode "+ 
            "where userpreferences.usercodenum = "+userNameId+" and itemsfeaturesdb.promotion = 'true' and "+ 
            "((itemsfeaturesdb.beaconidone = "+"'"+beaconIdOne+"'"+" and itemsfeaturesdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+") "+
            "or (itemsfeaturesdb.beaconidone = "+"'"+beaconIdTwo+"'"+" and itemsfeaturesdb.beaconidtwo = "+"'"+beaconIdOne+"'"+")) order by rand() Limit 1",(err,resultPrefered)=>{
        if(err){
            res.status(500).send("Error al consultar items");
        }else if(resultPrefered.length==0){
            res.status(404).send({Err:"No se obtuvieron resultados"});
        }else{
            //res.header("Content-Type", "application/json; charset=utf-8");
            res.send(resultPrefered);
        }
    });        
});

router.get("/morepreferred", (req, res, next) => {
    
         let userNameId = req.query.usernameid;
         let beaconIdOne = req.query.beaconidone;
         let beaconIdTwo = req.query.beaconidtwo;
    req.db.query("SELECT featuresdb.itemcode as itemcode, featuresdb.nameitem as itemname,featuresdb.description as itemdescription, featuresdb.urlimage as itemurl, featuresdb.sodium as itemsodium, featuresdb.sugar as itemsugar, featuresdb.promotion as promotion, featuresdb.promotiondescription as promotiondescription FROM featuresdb "+ 
            "inner join userpreferences "+ 
            "on featuresdb.itemcode = userpreferences.itemcode "+ 
            "where userpreferences.usercodenum = "+userNameId+" and "+ 
            "((featuresdb.beaconidone = "+"'"+beaconIdOne+"'"+" and featuresdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+") "+
            "or (featuresdb.beaconidone = "+"'"+beaconIdTwo+"'"+" and featuresdb.beaconidtwo = "+"'"+beaconIdOne+"'"+")) order by rand() Limit 1",(err,resultPrefered)=>{
        if(err){
            res.status(500).send("Error al consultar items");
        }else if(resultPrefered.length==0){
            res.status(404).send({Err:"No se obtuvieron resultados"});
        }else{
            //res.header("Content-Type", "application/json; charset=utf-8");
            res.send(resultPrefered);
        }
    });        
});

router.get("/aisle",(req,res,next)=>{

    let beaconIdOne = req.query.beaconidone;
    let beaconIdTwo = req.query.beaconidtwo;

    req.db.query("SELECT aislenamedb.aislename FROM aislenamedb inner join itemsfeaturesdb on aislenamedb.aislelocation = itemsfeaturesdb.aislelocation where ((itemsfeaturesdb.beaconidone = "+"'"+beaconIdOne+"'"+" and itemsfeaturesdb.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(itemsfeaturesdb.beaconidone = "+"'"+beaconIdTwo+"'"+" and itemsfeaturesdb.beaconidtwo = "+"'"+beaconIdOne+"'"+")) limit 1",(err,aislename)=>{
        if(err){
            res.status(500).send("Error al consultar items");
        }else if(aislename.length==0){
            res.status(404).send({Err:"No se obtuvieron resultados"});
        }else{
            //res.header("Content-Type", "application/json; charset=utf-8");
            res.send(aislename);
        }

    });
});

router.get("/closepromotion",(req,res,next)=>{
    let userNameId = req.query.usernameid;
    let beaconIdOne = req.query.beaconidone;
    let beaconIdTwo = req.query.beaconidtwo;

    req.db.query("SELECT featuresdb.aislelocation FROM featuresdb where ((featuresdb.beaconidone="+"'"+beaconIdOne+"'"+" and featuresdb.beaconidtwo="+"'"+beaconIdTwo+"'"+")or(featuresdb.beaconidone="+"'"+beaconIdOne+"'"+" and featuresdb.beaconidtwo="+"'"+beaconIdTwo+"'"+")) limit 1",(err,result)=>{
        if(err){
            res.status(500).send("Error al consultar items");
        }else if(result.length==0){
            res.status(404).send({Err:"No se obtuvieron resultados"});

        }else{
            var itemRandom = int(result[0].aislelocation);
            var itemRandom_sum = itemRandom.add(1);
            var itemRandom_rest = itemRandom - 1;
            req.db.query("SELECT itemsfeaturesdb.itemcode as itemcode, itemsfeaturesdb.nameitem as itemname,aislenamedb.aislename as itemdescription, itemsfeaturesdb.urlimage as itemurl, itemsfeaturesdb.sodium as itemsodium, itemsfeaturesdb.sugar as itemsugar, itemsfeaturesdb.promotion as promotion, itemsfeaturesdb.promotiondescription as promotiondescription "+
            "FROM itemsfeaturesdb inner join aislenamedb on aislenamedb.aislelocation = itemsfeaturesdb.aislelocation "+
            "where itemsfeaturesdb.promotion = 'true' and ((itemsfeaturesdb.aislelocation <> "+itemRandom+" or itemsfeaturesdb.aislelocation <> "+itemRandom_sum+") or (itemsfeaturesdb.aislelocation <> "+itemRandom+" or itemsfeaturesdb.aislelocation <> "+itemRandom_rest+")) "+
            "order by rand() Limit 1",(error,promotionout)=>{
                if(error){
                    res.status(500).send("Error al consultar items");
                }else if(promotionout.length==0){
                    res.status(404).send({error:"No se obtuvieron resultados"});
                }else{
                    //res.header("Content-Type", "application/json; charset=utf-8");
                    res.send([{itemname:promotionout[0].itemname,itemdescription:promotionout[0].itemdescription,itemurl:promotionout[0].itemurl,itemsodium:"other",itemsugar:"other",promotion:promotionout[0].promotion,promotiondescription:promotionout[0].promotiondescription}]);
                }
            });
            
        }
    });

});

router.get("/liked",(req,res,next)=>{
    let userNameId = req.query.usernameid;

    //console.log("SELECT itemsfeaturesdb.nameitem as itemname, itemsfeaturesdb.description as itemdescription, itemsfeaturesdb.urlimage as itemurl, itemsfeaturesdb.sodium as itemsodium, itemsfeaturesdb.sugar as itemsugar, itemsfeaturesdb.promotion as promotion, itemsfeaturesdb.promotiondescription as promotiondescription FROM itemsfeaturesdb inner join userresponsesdb on userresponsesdb.nameitem = itemsfeaturesdb.itemcode where userresponsesdb.userid = "+userNameId);
    req.db.query("SELECT itemsfeaturesdb.nameitem as name, itemsfeaturesdb.description as description, itemsfeaturesdb.urlimage as urlimage FROM itemsfeaturesdb inner join userresponsesdb on userresponsesdb.nameitem = itemsfeaturesdb.itemcode where userresponsesdb.userid = "+userNameId,(err,result)=>{
        if(err){
            res.status(500).send("Error al consultar items");
        }else if(result.length==0){
            res.status(404).send({Err:"No se obtuvieron resultados"});
        }else{
            res.send(result);
        }

    });
});



router.get("/feedback", (req, res, next) => {

    let userNameId = req.query.usernameid;
    let itemId = req.query.itemid;

    req.db.query("INSERT INTO userresponsesdb SET userid = ?, nameitem = ?",[userNameId, itemId],(err, result)=>{
        if(err){
            res.status(500)
            .send({Success: true, message: "Error al ejecutar la tarea"});
        }else{
            res.send([{userid:userNameId,nameitem:itemId }]);
        }


    });
});

 /*router.post("/feedback", (req, res, next) => {
     let item = req.body;
    req.db.query("INSERT INTO userresponsesdb SET userid = ?, nameitem = ?, response = ?",[item.userid, item.nameitem, item.response],(err, result)=>{
        if(err){
            res.status(500)
            .send({Success: true, message: "Error al ejecutar la tarea"});
        }else{
            res.send({Success:true});
        }


    });

});*/


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