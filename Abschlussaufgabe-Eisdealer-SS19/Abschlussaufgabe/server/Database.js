"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongo = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
console.log("Database starting");
let databaseURL = "mongodb://tomdb:tom123@ds153947.mlab.com:53947/tomdb";
let databaseName = "tomdb";
let db;
let orders;
let data;
if (process.env.NODE_ENV == "production") {
    databaseURL = "mongodb://tomdb:tom123@ds153947.mlab.com:53947/tomdb";
    databaseName = "tomdb";
}
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        console.log(databaseURL);
        db = _db.db(databaseName);
        orders = db.collection("orders");
        data = db.collection("data");
    }
}
function insertOrder(_doc) {
    orders.insertOne(_doc, handleInsert);
}
exports.insertOrder = insertOrder;
function saveData(_doc) {
    data.deleteOne({});
    data.insertOne(_doc, handleInsert);
}
exports.saveData = saveData;
function deleteAllOrders() {
    orders.deleteMany({});
}
exports.deleteAllOrders = deleteAllOrders;
function deleteSingleOrder(id) {
    orders.deleteOne({ "_id": ObjectId(id) });
}
exports.deleteSingleOrder = deleteSingleOrder;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
function getData(_callback, targetDb) {
    if (targetDb == "data")
        var cursor = data.find();
    else
        cursor = orders.find();
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, dataArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(dataArray));
    }
}
exports.getData = getData;
//# sourceMappingURL=Database.js.map