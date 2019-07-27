namespace AbschlussaufgabeSS19 {

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
        xhr.addEventListener("readystatechange", handleStateChangeDeleteOrders);
        xhr.send();
    }

    function newSingleOrder(singleOrderJSON: JSON, key: string): HTMLDivElement {

        const ordersWrapper: HTMLDivElement = <HTMLDivElement>document.getElementById("orders-wrapper");
        const divSingleOrder: HTMLElement = newElement("div", "single-order col-12 mb-5", ordersWrapper);
        const divBorder: HTMLElement = newElement("div", "m-2 shadow-lg rounded px-4 py-5", divSingleOrder);

        // HEADER OF ORDER 

        const divHeaderRow: HTMLElement = newElement("div", "pb-4 mb-4 px-5 border-bottom border-secondary row", divBorder);
        const divHeadline: HTMLElement = newElement("div", "col-6", divHeaderRow);

        const orderHeadline: HTMLHeadingElement = document.createElement("h4");
        divHeadline.append(orderHeadline);
        let headlineText: string = "Order No. " + (parseInt(key) + 1);
        orderHeadline.innerHTML = headlineText;

        const divButton: HTMLElement = newElement("div", "col-6 d-flex justify-content-end", divHeaderRow);
        const closeButton: HTMLButtonElement = <HTMLButtonElement>newElement("button", "mr-3 btn btn-success rounded-circle font-weight-bold", divButton);
        closeButton.setAttribute("type", "button");
        closeButton.innerHTML = "✓";
        closeButton.addEventListener("click", function (): void {
            toggleModal("order", headlineText, divSingleOrder, false);
            console.log(orderIdStorage[parseInt(key)]);

        });


        // ITEMS OF ORDER 

        const itemsWrapper: HTMLElement = newElement("div", "items-wrapper", divBorder);
        const divDescriptionRow: HTMLElement = newElement("div", "row pb-3 mx-4", itemsWrapper);

        const numberDescription: HTMLElement = newElement("div", "col-2 text-muted", divDescriptionRow);
        numberDescription.innerHTML = "Number";

        const articleDescription: HTMLElement = newElement("div", "col-6 text-muted", divDescriptionRow);
        articleDescription.innerHTML = "Article";

        const priceDescription: HTMLElement = newElement("div", "col-3 text-right text-muted", divDescriptionRow);
        priceDescription.innerHTML = "Price";

        let grandTotal: number = 0;

        for (let i in singleOrderJSON) {
            const divOrderRow: HTMLElement = newElement("div", "order-row row py-1 rounded mb-1 mx-4", itemsWrapper);

            const numberCol: HTMLElement = newElement("div", "col-2", divOrderRow);
            numberCol.innerHTML = (parseInt(i) + 1).toString();

            const articleCol: HTMLElement = newElement("div", "col-6", divOrderRow);
            articleCol.innerHTML = singleOrderJSON[i].name;

            const priceCol: HTMLElement = newElement("div", "col-3 text-right", divOrderRow);
            priceCol.innerHTML = singleOrderJSON[i].price;

            const euroSymbol: HTMLElement = newElement("div", "col-1", divOrderRow);
            euroSymbol.innerHTML = "€";

            grandTotal += parseFloat(singleOrderJSON[i].price);
        }

        const divTotal: HTMLElement = newElement("div", "row pt-3 pb-1 rounded mb-1 mx-4 mt-4", divBorder);

        const placeholderTotal: HTMLElement = newElement("div", "col-9 text-right font-weight-bold", divTotal);
        placeholderTotal.innerHTML = "Total";

        const total: HTMLElement = newElement("div", "col-2 text-right font-weight-bold", divTotal);
        total.innerHTML = grandTotal.toFixed(2);

        const euro: HTMLElement = newElement("div", "col-1 font-weight-bold", divTotal);
        euro.innerHTML = "€";

        return ordersWrapper;
    }



    function handleStateChangeDeleteOrders(_event: Event): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response (getData):", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            //getOrdersFromServer();
        }
    }

    export function deleteSingleOrder(elementToRemove: HTMLElement): void {
        const allOrders: HTMLCollection = document.getElementsByClassName("single-order");
        let index: number;

        for (let i: number = 0; i < allOrders.length; i++) {
            if (elementToRemove == allOrders[i])
                index = i;
        }

        const orderId: string = orderIdStorage[index];

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", (address + "?delSinOr" + orderId) , true);
        xhr.addEventListener("readystatechange", handleStateChangeDeleteOrders);
        xhr.send();
    }

    function getOrdersFromServer(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?getOrder", true);
        xhr.addEventListener("readystatechange", handleStateChangeGetOrders);
        xhr.send();
    }

    function handleStateChangeGetOrders(_event: Event): void {
        let xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response (getOrders):", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            orderView(xhr.response);
        }
    }
}