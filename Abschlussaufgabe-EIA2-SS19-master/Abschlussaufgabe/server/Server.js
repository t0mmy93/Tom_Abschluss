"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
var WBKreloadedServer;
(function (WBKreloadedServer) {
    let order = {};
    console.log("Starting server");
    let port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        let url_object = Url.parse(_request.url, true);
        let query = decodeURI(url_object.path);
        let queryAlt = url_object.query;
        console.log("decoded string from URI:");
        console.log(query);
        console.log("query from URI:");
        console.log(queryAlt);
        let document = [];
        if (url_object.pathname != "/favicon.ico") {
            // console.log(query);
        }
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _request.url;
        let requestType = query.slice(0, 10);
        console.log("REQUEST-TYPE: " + requestType);
        query = query.slice(10, query.length);
        let json;
        switch (requestType) {
            case "/?saveData":
                console.log("---------------Seller changed offers--------------");
                json = JSON.parse(query);
                console.log(query);
                console.log(json);
                console.log(encodeURI(query));
                let data = {
                    datatype: "data",
                    datastring: encodeURI(query)
                };
                Database.saveData(data);
                _response.write(query);
                //                console.log(json[0]["items"][1])
                //
                //                for (let i in json) {
                //                    document[parseInt(i)] = {
                //                        title: json[i]["title"],
                //                        amount_type: json[i]["amount_type"],
                //                        amount: null,
                //                        form_type: json[i]["form_type"],
                //                        items: [{ name: null, price: null }, { name: null, price: null }],
                //                    }
                //
                //                    for (let k: number = 0; k < json[i]["items"].length; k++) {
                //                        document[parseInt(i)]["items"][k] =
                //                            {
                //                                name: json[i]["items"][k]["name"],
                //                                price: json[i]["items"][k]["price"],
                //                            }
                //                    }
                //                }
                //                let temp = JSON.stringify(document)
                //                document = JSON.parse(temp)
                //                console.log(document)
                //                Database.saveData(document);
                _response.end();
                break;
            case "/?getOrder":
                console.log("---------------Orders requested--------------");
                Database.getData(findCallback, "order");
                break;
            case "/?getData0":
                console.log("---------------Offer Data requested--------------");
                Database.getData(findCallback, "data");
                break;
            case "/?newOrder":
                if (query == "[]")
                    _response.write("Leere Bestellung");
                else {
                    json = JSON.parse(query);
                    console.log(query);
                    console.log(json);
                    console.log("---------------New order came in--------------");
                    let order = {
                        datatype: "order",
                        datastring: encodeURI(query)
                    };
                    _response.write(query);
                    Database.insertOrder(order);
                }
                _response.end();
                break;
            case "/?delOrder":
                Database.deleteAllOrders();
                _response.write("All Orders Deleted");
                _response.end();
                break;
            case "/?delSinOr":
                Database.deleteSingleOrder(query);
                _response.write("Order with id " + query + " deleted.");
                _response.end();
                break;
        }
        function findCallback(json) {
            let query = JSON.parse(json);
            console.log(query);
            let query2 = JSON.stringify(query);
            console.log(query2);
            respond(_response, json);
        }
        function respond(_response, _text) {
            console.log("Preparing response: " + _text);
            //   _response.setHeader("Access-Control-Allow-Origin", "*");
            //  _response.setHeader("content-type", "text/html; charset=utf-8");
            _response.write(_text);
            _response.end();
        }
    }
})(WBKreloadedServer || (WBKreloadedServer = {}));
//# sourceMappingURL=Server.js.map