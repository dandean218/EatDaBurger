const express = require ("express");

const router = express.Router();

const burger = require("../models/burger.js");

//sets up the routes
router.get("/", function(req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function (req, res){
    burger.selectAll("burgers", function(data){
        const burgersObject = {
            burgers: data
        };
        console.log(burgersObject);
        res.render("index", burgersObject);
    });
});

router.post("/burgers/create", function (req, res) {
    burger.insertOne("burger_name", [req.body.burger_name], function (){
        res.redirect('/');
    });
});

router.put('/burgers/:id', function (req, res){
    const condition = "id = " + req.params.id;

    console.log("condition", condition);
    console.log(req.body);
    burger.updateOne({
        devoured: req.body.devoured == "true" ? 1 : 0},
        // devoured: req.body.devoured},
        condition, function(data){
        if(data.changedRows == 0){
            return res.status(404).end();
        }
        else{
            res.status(200).end();
        }
    });
});

//exports the routes to server.js
module.exports = router;
