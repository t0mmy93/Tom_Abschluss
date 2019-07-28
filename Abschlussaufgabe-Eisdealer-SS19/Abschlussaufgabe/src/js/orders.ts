namespace eisdealer {

    let orderIdStorage: string[] = [];

    document.addEventListener("DOMContentLoaded", function (): void {
        getOrdersFromServer();
        document.getElementById("close-all").addEventListener("click", deleteAllOrders);

    });

    function orderView(response: string): void {
        document.getElementById("orders-wrapper").innerHTML = "";

        let tempJSON: JSON = JSON.parse(response);
        console.log("%cParsed Response to JSON-Object:", "color: white; background-color: green");
        console.log(tempJSON);

        let datastring: string;
        let orderJSON: JSON;
        let id: string;
 
        orderIdStorage = [];
 
        for (let key in tempJSON) {
            id = (decodeURI(tempJSON[key]._id));
            orderIdStorage.push(id);
            datastring = (decodeURI(tempJSON[key].datastring));
            console.log("datastring for key: " + key);
            console.log(datastring);

            orderJSON = JSON.parse(datastring);

            console.log("%cOrder no." + key + ":", "color: white; background-color: pink");
            console.log(orderJSON);

            newSingleOrder(orderJSON, key);
        }
    }


    function deleteAllOrders(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?delOrder", true);
        xhr.addEventListener("readystatechange", handleChangeDeleteOrders);
        xhr.send();
    }

    function newSingleOrder(singleOrderJSON: JSON, key: string): HTMLDivElement {

        let ordersWrapper: HTMLDivElement = <HTMLDivElement>document.getElementById("orders-wrapper");
        let divSingleOrder: HTMLElement = newElements("div", "single-order col-12 mb-5", ordersWrapper);
        let divBorder: HTMLElement = newElements("div", "m-2 shadow-lg rounded px-4 py-5", divSingleOrder);

        // HEADER OF ORDER 

        let divHeaderRow: HTMLElement = newElements("div", "pb-4 mb-4 px-5 border-bottom border-secondary row", divBorder);
        let divHeadline: HTMLElement = newElements("div", "col-6", divHeaderRow);

        let orderHeadline: HTMLHeadingElement = document.createElement("h4");
        divHeadline.append(orderHeadline);
        let headlineText: string = "Order No. " + (parseInt(key) + 1);
        orderHeadline.innerHTML = headlineText;

        let divButton: HTMLElement = newElements("div", "col-6 d-flex justify-content-end", divHeaderRow);
        let closeButton: HTMLButtonElement = <HTMLButtonElement>newElements("button", "mr-3 btn btn-success rounded-circle font-weight-bold", divButton);
        closeButton.setAttribute("type", "button");
        closeButton.innerHTML = "✓";
        closeButton.addEventListener("click", function (): void {
            toggleModal("order", headlineText, divSingleOrder, false);
            console.log(orderIdStorage[parseInt(key)]);

        });


        // ITEMS OF ORDER 

        let itemsWrapper: HTMLElement = newElements("div", "items-wrapper", divBorder);
        let divDescriptionRow: HTMLElement = newElements("div", "row pb-3 mx-4", itemsWrapper);

        let numberDescription: HTMLElement = newElements("div", "col-2 text-muted", divDescriptionRow);
        numberDescription.innerHTML = "Number";

        let articleDescription: HTMLElement = newElements("div", "col-6 text-muted", divDescriptionRow);
        articleDescription.innerHTML = "Article";

        let priceDescription: HTMLElement = newElements("div", "col-3 text-right text-muted", divDescriptionRow);
        priceDescription.innerHTML = "Price";

        let grandTotal: number = 0;

        for (let i in singleOrderJSON) {
            let divOrderRow: HTMLElement = newElements("div", "order-row row py-1 rounded mb-1 mx-4", itemsWrapper);

            let numberCol: HTMLElement = newElements("div", "col-2", divOrderRow);
            numberCol.innerHTML = (parseInt(i) + 1).toString();

            let articleCol: HTMLElement = newElements("div", "col-6", divOrderRow);
            articleCol.innerHTML = singleOrderJSON[i].name;

            let priceCol: HTMLElement = newElements("div", "col-3 text-right", divOrderRow);
            priceCol.innerHTML = singleOrderJSON[i].price;

            let euroSymbol: HTMLElement = newElements("div", "col-1", divOrderRow);
            euroSymbol.innerHTML = "€";

            grandTotal += parseFloat(singleOrderJSON[i].price);
        }

        let divTotal: HTMLElement = newElements("div", "row pt-3 pb-1 rounded mb-1 mx-4 mt-4", divBorder);

        let placeholderTotal: HTMLElement = newElements("div", "col-9 text-right font-weight-bold", divTotal);
        placeholderTotal.innerHTML = "Total";

        let total: HTMLElement = newElements("div", "col-2 text-right font-weight-bold", divTotal);
        total.innerHTML = grandTotal.toFixed(2);

        let euro: HTMLElement = newElements("div", "col-1 font-weight-bold", divTotal);
        euro.innerHTML = "€";

        return ordersWrapper;
    }



    function handleChangeDeleteOrders(_event: Event): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response (getData):", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            //getOrdersFromServer();
        }
    }

    export function deleteSingleOrder(elementToRemove: HTMLElement): void {
        let allOrders: HTMLCollection = document.getElementsByClassName("single-order");
        let index: number;

        for (let i: number = 0; i < allOrders.length; i++) {
            if (elementToRemove == allOrders[i])
                index = i;
        }

        let orderId: string = orderIdStorage[index];

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", (address + "?delSinOr" + orderId) , true);
        xhr.addEventListener("readystatechange", handleChangeDeleteOrders);
        xhr.send();
    }

    function getOrdersFromServer(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?getOrder", true);
        xhr.addEventListener("readystatechange", handleChangeGetOrders);
        xhr.send();
    }

    function handleChangeGetOrders(_event: Event): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response (getOrders):", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            orderView(xhr.response);
        }
    }
}