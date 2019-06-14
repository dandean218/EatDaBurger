//importing mysql connection
const connection = require("../config/connection.js");

//helper function for SQL syntax
function printQuestionMarks(num){
    const questionArray = [];
    for(let i = 0; i < num; i++){
        questionArray.push("?");
    }
    return questionArray.toString();
}

//code to convert object key/value pairs into SQL syntax
function objToSQL(obj){
    const conversionArray = [];

    for(let key in obj){
        let value = obj[key];

        if(Object.hasOwnProperty.call(obj, key)) {
            if(typeof value === "string" && value.indexOf("") >= 0){
                value = "'" + value + "'";
            }
        conversionArray.push(key + "=" + value);
        }
    }
    return conversionArray.toString();
}

const orm = {
    selectAll: function(tableInput, cb){
        const queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result){
            if (err) {
                throw err;
            }
            cb (result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if(err){
                throw err;
            }
            cb (result);
        });
    },
    
    updateOne:function (table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;
        
        queryString += " SET ";
        queryString += objToSQL (objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log (queryString);
        connection.query (queryString, function (err, result){
            if (err){
                throw err;
            }

            cb (result);
        });
    },

    // delete: function (table, condition, cb) {
    //     const queryString = "DELETE FROM " + table;
    //     queryString += " WHERE ";
    //     queryString += condition;
        
    //     connection.query (queryString, function (err, result){
    //         if(err){
    //             throw err;
    //         }
    //         cb (result);
    //     });
    // }

};
//exporting orm object for burger.js
module.exports = orm;
