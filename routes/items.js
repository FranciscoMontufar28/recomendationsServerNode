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
     let beaconIdOne = req.query.beaconidone;
     let beaconIdTwo = req.query.beaconidtwo;
    req.db.query("SELECT userpreferences.itemcode FROM userpreferences inner join itemslocationbeacons on itemslocationbeacons.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and ((itemslocationbeacons.beaconidone = "+"'"+beaconIdOne+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(itemslocationbeacons.beaconidone = "+"'"+beaconIdOne+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdTwo+"'"+"))) order by rand() Limit 1",(err,result)=>{   
        console.log("SELECT userpreferences.itemcode FROM userpreferences inner join itemslocationbeacons on itemslocationbeacons.itemcode = userpreferences.itemcode where (userpreferences.usercodenum = "+"'"+userNameId+"'"+" and ((itemslocationbeacons.beaconidone = "+"'"+beaconIdOne+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(itemslocationbeacons.beaconidone = "+"'"+beaconIdOne+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdTwo+"'"+"))) order by rand() Limit 1");
        if(err){
            res.status(500).send("Error al consultar items");
        }else if(result.length==0){
            res.status(404).send({Err:"No se obtuvieron resultados"});

        }else{
            var itemRandom = result[0].itemcode;
            req.db.query("SELECT itemslocationbeacons.nameitem as itemname,itemslocationbeacons.description as itemdescription, itemslocationbeacons.urlimage as itemurl, itemslocationbeacons.sodium as itemsodium, itemslocationbeacons.sugar as itemsugar "+ 
            "FROM similarity inner join itemslocationbeacons on itemslocationbeacons.itemcode = similarity.id_second_item "+ 
            "where similarity.id_first_item = "+itemRandom+" and similarity.coef_similarity "+ 
            "BETWEEN 40 AND 80 and "+ 
            "((itemslocationbeacons.beaconidone = "+"'"+beaconIdOne+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(itemslocationbeacons.beaconidone = "+"'"+beaconIdTwo+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdOne+"'"+"))"+
            "order by rand() Limit 5",(error,resultrandom)=>{
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

router.get("/morepreferred", (req, res, next) => {
    
         let userNameId = req.query.usernameid;
         let beaconIdOne = req.query.beaconidone;
         let beaconIdTwo = req.query.beaconidtwo;
    req.db.query("SELECT itemslocationbeacons.nameitem as itemname,itemslocationbeacons.description as itemdescription, itemslocationbeacons.urlimage as itemurl, itemslocationbeacons.sodium as itemsodium, itemslocationbeacons.sugar as itemsugar FROM itemslocationbeacons "+ 
            "inner join userpreferences "+ 
            "on itemslocationbeacons.itemcode = userpreferences.itemcode "+ 
            "where userpreferences.usercodenum = "+userNameId+" and "+ 
            "((itemslocationbeacons.beaconidone = "+"'"+beaconIdOne+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdTwo+"'"+") "+
            "or (itemslocationbeacons.beaconidone = "+"'"+beaconIdTwo+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdOne+"'"+")) order by rand() Limit 1",(err,resultPrefered)=>{
        if(err){
            res.status(500).send("Error al consultar items");
        }else if(resultPrefered.length==0){
            res.status(404).send({Err:"No se obtuvieron resultados"});
        }else{
            res.send(resultPrefered);
        }
    });        
});

router.get("/aisle",(req,res,next)=>{

    let beaconIdOne = req.query.beaconidone;
    let beaconIdTwo = req.query.beaconidtwo;

    req.db.query("SELECT aislenamedb.aislename FROM aislenamedb inner join itemslocationbeacons on aislenamedb.aislelocation = itemslocationbeacons.aislelocation where ((itemslocationbeacons.beaconidone = "+"'"+beaconIdOne+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(itemslocationbeacons.beaconidone = "+"'"+beaconIdTwo+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdOne+"'"+")) limit 1",(err,aislename)=>{
        console.log("SELECT aislenamedb.aislename FROM aislenamedb inner join itemslocationbeacons on aislenamedb.aislelocation = itemslocationbeacons.aislelocation where ((itemslocationbeacons.beaconidone = "+"'"+beaconIdOne+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdTwo+"'"+")or(itemslocationbeacons.beaconidone = "+"'"+beaconIdTwo+"'"+" and itemslocationbeacons.beaconidtwo = "+"'"+beaconIdOne+"'"+")) limit 1");
        if(err){
            res.status(500).send("Error al consultar items");
        }else if(aislename.length==0){
            res.status(404).send({Err:"No se obtuvieron resultados"});
        }else{
            res.send(aislename);
        }

    });
});

 router.post("/", (req, res, next) => {
     let item = req.body;
    req.db.query("INSERT INTO userresponsesdb SET userid = ?, nameitem = ?, response = ?",[item.userid, item.nameitem, item.response],(err, result)=>{
        if(err){
            res.status(500)
            .send({err:"Erro al insertar item"});
        }else{
            res.send({Success:true});
        }


    });

     //let item = req.body;
     //res.send({ Success: true, item: item });
});


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