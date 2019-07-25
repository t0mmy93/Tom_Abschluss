import * as Http from "http";
import * as Url from "url";
import * as Database from "./Database";


namespace WBKreloadedServer {
    interface AssocStringString {
        [key: string]: string;
    }
    interface Entrypoints {
        amount: string,
        item: string,
        price: string,
    }
    export interface StoredData {
        datatype: string;
        datastring: string;
    }

    export interface Categories {
        [key: number]: Category;
    }
    export interface Category {
        title: string;
        amount_type: string;
        amount: Amount;
        form_type: string;
        items: Item[];
    }
    export interface Item {
        name: string;
        price: number;
    }
    export interface Amount {
        steps: number[];
        display: string[];
    }
    interface OrderData { [key: string]: string; }

    let order: OrderData = {};
    export let block: string;

    console.log("Starting server");
    let port: number = process.env.PORT;
    if (port == undefined)
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        let url_object = Url.parse(_request.url, true);
        let query: string = decodeURI(url_object.path);
        let queryAlt = url_object.query;

        console.log("decoded string from URI:");
        console.log(query);
        console.log("query from URI:");
        console.log(queryAlt);

        let document: Categories = [];

        if (url_object.pathname != "/favicon.ico") {
            // console.log(query);
        }
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _request.url;

        let requestType: string = query.slice(0, 10);
        console.log("REQUEST-TYPE: " + requestType);
        query = query.slice(10, query.length);

        let json: JSON;

        switch (requestType) {
            case "/?saveData":
                console.log("---------------Seller changed offers--------------");
                json = JSON.parse(query);

                console.log(query);
                console.log(json);
                console.log(encodeURI(query));

                let data: StoredData = {
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
                console.log("---------------Orders requested--------------")
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


                    console.log("---------------New order came in--------------")


                    let order: StoredData = {
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
        function findCallback(json: string): void { 
            let query: AssocStringString = JSON.parse(json);
            console.log(query);
            let query2: string = JSON.stringify(query);

            console.log(query2);
            respond(_response, json);
        }
        function respond(_response: Http.ServerResponse, _text: string): void {
            console.log("Preparing response: " + _text);
            //   _response.setHeader("Access-Control-Allow-Origin", "*");
            //  _response.setHeader("content-type", "text/html; charset=utf-8");
            _response.write(_text);
            _response.end();
        }


    }

}  