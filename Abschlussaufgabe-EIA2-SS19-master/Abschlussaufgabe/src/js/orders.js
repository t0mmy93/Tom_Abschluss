var AbschlussaufgabeSS19;
(function (AbschlussaufgabeSS19) {
    let orderIdStorage = [];
    document.addEventListener("DOMContentLoaded", function () {
        getOrdersFromServer();
        document.getElementById("close-all").addEventListener("click", deleteAllOrders);
    });
    function orderView(response) {
        document.getElementById("orders-wrapper").innerHTML = "";
        let tempJSON = JSON.parse(response);
        let datastring;
        let orderJSON;
        let id;
        orderIdStorage = [];
        for (let key in tempJSON) {
            id = (decodeURI(tempJSON[key]._id));
            orderIdStorage.push(id);
            datastring = (decodeURI(tempJSON[key].datastring));
            orderJSON = JSON.parse(datastring);
            newSingleOrder(orderJSON, key);
        }
    }
    function deleteAllOrders() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", AbschlussaufgabeSS19.address + "?delOrder", true);
        xhr.addEventListener("readystatechange", handleStateChangeDeleteOrders);
        xhr.send();
    }
    function newSingleOrder(singleOrderJSON, key) {
        const ordersWrapper = document.getElementById("orders-wrapper");
        const divSingleOrder = AbschlussaufgabeSS19.newElement("div", "single-order col-12 mb-5", ordersWrapper);
        const divBorder = AbschlussaufgabeSS19.newElement("div", "m-2 shadow-lg rounded px-4 py-5", divSingleOrder);
        const divHeaderRow = AbschlussaufgabeSS19.newElement("div", "pb-4 mb-4 px-5 border-bottom border-secondary row", divBorder);
        const divHeadline = AbschlussaufgabeSS19.newElement("div", "col-6", divHeaderRow);
        const orderHeadline = document.createElement("h4");
        divHeadline.append(orderHeadline);
        let headlineText = "Order No. " + (parseInt(key) + 1);
        orderHeadline.innerHTML = headlineText;
        const divButton = AbschlussaufgabeSS19.newElement("div", "col-6 d-flex justify-content-end", divHeaderRow);
        const closeButton = AbschlussaufgabeSS19.newElement("button", "mr-3 btn btn-success rounded-circle font-weight-bold", divButton);
        closeButton.setAttribute("type", "button");
        closeButton.innerHTML = "✓";
        closeButton.addEventListener("click", function () {
            AbschlussaufgabeSS19.toggleModal("order", headlineText, divSingleOrder, false);
        });
        const itemsWrapper = AbschlussaufgabeSS19.newElement("div", "items-wrapper", divBorder);
        const divDescriptionRow = AbschlussaufgabeSS19.newElement("div", "row pb-3 mx-4", itemsWrapper);
        const numberDescription = AbschlussaufgabeSS19.newElement("div", "col-2 text-muted", divDescriptionRow);
        numberDescription.innerHTML = "Number";
        const articleDescription = AbschlussaufgabeSS19.newElement("div", "col-6 text-muted", divDescriptionRow);
        articleDescription.innerHTML = "Article";
        const priceDescription = AbschlussaufgabeSS19.newElement("div", "col-3 text-right text-muted", divDescriptionRow);
        priceDescription.innerHTML = "Price";
        let grandTotal = 0;
        for (let i in singleOrderJSON) {
            const divOrderRow = AbschlussaufgabeSS19.newElement("div", "order-row row py-1 rounded mb-1 mx-4", itemsWrapper);
            const numberCol = AbschlussaufgabeSS19.newElement("div", "col-2", divOrderRow);
            numberCol.innerHTML = (parseInt(i) + 1).toString();
            const articleCol = AbschlussaufgabeSS19.newElement("div", "col-6", divOrderRow);
            articleCol.innerHTML = singleOrderJSON[i].name;
            const priceCol = AbschlussaufgabeSS19.newElement("div", "col-3 text-right", divOrderRow);
            priceCol.innerHTML = singleOrderJSON[i].price;
            const euroSymbol = AbschlussaufgabeSS19.newElement("div", "col-1", divOrderRow);
            euroSymbol.innerHTML = "€";
            grandTotal += parseFloat(singleOrderJSON[i].price);
        }
        const divTotal = AbschlussaufgabeSS19.newElement("div", "row pt-3 pb-1 rounded mb-1 mx-4 mt-4", divBorder);
        const placeholderTotal = AbschlussaufgabeSS19.newElement("div", "col-9 text-right font-weight-bold", divTotal);
        placeholderTotal.innerHTML = "Total";
        const total = AbschlussaufgabeSS19.newElement("div", "col-2 text-right font-weight-bold", divTotal);
        total.innerHTML = grandTotal.toFixed(2);
        const euro = AbschlussaufgabeSS19.newElement("div", "col-1 font-weight-bold", divTotal);
        euro.innerHTML = "€";
        return ordersWrapper;
    }
    function handleStateChangeDeleteOrders(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE)
            ;
    }
    function deleteSingleOrder(elementToRemove) {
        const allOrders = document.getElementsByClassName("single-order");
        let index;
        for (let i = 0; i < allOrders.length; i++) {
            if (elementToRemove == allOrders[i])
                index = i;
        }
        const orderId = orderIdStorage[index];
        let xhr = new XMLHttpRequest();
        xhr.open("GET", (AbschlussaufgabeSS19.address + "?delSinOr" + orderId), true);
        xhr.addEventListener("readystatechange", handleStateChangeDeleteOrders);
        xhr.send();
    }
    AbschlussaufgabeSS19.deleteSingleOrder = deleteSingleOrder;
    function getOrdersFromServer() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", AbschlussaufgabeSS19.address + "?getOrder", true);
        xhr.addEventListener("readystatechange", handleStateChangeGetOrders);
        xhr.send();
    }
    function handleStateChangeGetOrders(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
        }
    }
})(AbschlussaufgabeSS19 || (AbschlussaufgabeSS19 = {}));
//# sourceMappingURL=orders.js.map