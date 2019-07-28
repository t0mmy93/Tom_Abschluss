var eisdealer;
(function (eisdealer) {
    let orderIdStorage = [];
    document.addEventListener("DOMContentLoaded", function () {
        getOrdersFromServer();
        document.getElementById("close-all").addEventListener("click", deleteAllOrders);
    });
    function orderView(response) {
        document.getElementById("orders-wrapper").innerHTML = "";
        let tempJSON = JSON.parse(response);
        console.log("%cParsed Response to JSON-Object:", "color: white; background-color: green");
        console.log(tempJSON);
        let datastring;
        let orderJSON;
        let id;
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
    function deleteAllOrders() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", eisdealer.address + "?delOrder", true);
        xhr.addEventListener("readystatechange", handleChangeDeleteOrders);
        xhr.send();
    }
    function newSingleOrder(singleOrderJSON, key) {
        let ordersWrapper = document.getElementById("orders-wrapper");
        let divSingleOrder = eisdealer.newElements("div", "single-order col-12 mb-5", ordersWrapper);
        let divBorder = eisdealer.newElements("div", "m-2 shadow-lg rounded px-4 py-5", divSingleOrder);
        // HEADER OF ORDER 
        let divHeaderRow = eisdealer.newElements("div", "pb-4 mb-4 px-5 border-bottom border-secondary row", divBorder);
        let divHeadline = eisdealer.newElements("div", "col-6", divHeaderRow);
        let orderHeadline = document.createElement("h4");
        divHeadline.append(orderHeadline);
        let headlineText = "Order No. " + (parseInt(key) + 1);
        orderHeadline.innerHTML = headlineText;
        let divButton = eisdealer.newElements("div", "col-6 d-flex justify-content-end", divHeaderRow);
        let closeButton = eisdealer.newElements("button", "mr-3 btn btn-success rounded-circle font-weight-bold", divButton);
        closeButton.setAttribute("type", "button");
        closeButton.innerHTML = "✓";
        closeButton.addEventListener("click", function () {
            eisdealer.toggleModal("order", headlineText, divSingleOrder, false);
            console.log(orderIdStorage[parseInt(key)]);
        });
        // ITEMS OF ORDER 
        let itemsWrapper = eisdealer.newElements("div", "items-wrapper", divBorder);
        let divDescriptionRow = eisdealer.newElements("div", "row pb-3 mx-4", itemsWrapper);
        let numberDescription = eisdealer.newElements("div", "col-2 text-muted", divDescriptionRow);
        numberDescription.innerHTML = "Number";
        let articleDescription = eisdealer.newElements("div", "col-6 text-muted", divDescriptionRow);
        articleDescription.innerHTML = "Article";
        let priceDescription = eisdealer.newElements("div", "col-3 text-right text-muted", divDescriptionRow);
        priceDescription.innerHTML = "Price";
        let grandTotal = 0;
        for (let i in singleOrderJSON) {
            let divOrderRow = eisdealer.newElements("div", "order-row row py-1 rounded mb-1 mx-4", itemsWrapper);
            let numberCol = eisdealer.newElements("div", "col-2", divOrderRow);
            numberCol.innerHTML = (parseInt(i) + 1).toString();
            let articleCol = eisdealer.newElements("div", "col-6", divOrderRow);
            articleCol.innerHTML = singleOrderJSON[i].name;
            let priceCol = eisdealer.newElements("div", "col-3 text-right", divOrderRow);
            priceCol.innerHTML = singleOrderJSON[i].price;
            let euroSymbol = eisdealer.newElements("div", "col-1", divOrderRow);
            euroSymbol.innerHTML = "€";
            grandTotal += parseFloat(singleOrderJSON[i].price);
        }
        let divTotal = eisdealer.newElements("div", "row pt-3 pb-1 rounded mb-1 mx-4 mt-4", divBorder);
        let placeholderTotal = eisdealer.newElements("div", "col-9 text-right font-weight-bold", divTotal);
        placeholderTotal.innerHTML = "Total";
        let total = eisdealer.newElements("div", "col-2 text-right font-weight-bold", divTotal);
        total.innerHTML = grandTotal.toFixed(2);
        let euro = eisdealer.newElements("div", "col-1 font-weight-bold", divTotal);
        euro.innerHTML = "€";
        return ordersWrapper;
    }
    function handleChangeDeleteOrders(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response (getData):", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            //getOrdersFromServer();
        }
    }
    function deleteSingleOrder(elementToRemove) {
        let allOrders = document.getElementsByClassName("single-order");
        let index;
        for (let i = 0; i < allOrders.length; i++) {
            if (elementToRemove == allOrders[i])
                index = i;
        }
        let orderId = orderIdStorage[index];
        let xhr = new XMLHttpRequest();
        xhr.open("GET", (eisdealer.address + "?delSinOr" + orderId), true);
        xhr.addEventListener("readystatechange", handleChangeDeleteOrders);
        xhr.send();
    }
    eisdealer.deleteSingleOrder = deleteSingleOrder;
    function getOrdersFromServer() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", eisdealer.address + "?getOrder", true);
        xhr.addEventListener("readystatechange", handleChangeGetOrders);
        xhr.send();
    }
    function handleChangeGetOrders(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response (getOrders):", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            orderView(xhr.response);
        }
    }
})(eisdealer || (eisdealer = {}));
//# sourceMappingURL=orders.js.map