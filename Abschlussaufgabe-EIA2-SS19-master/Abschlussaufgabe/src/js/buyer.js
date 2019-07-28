var AbschlussaufgabeSS19;
(function (AbschlussaufgabeSS19) {
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("cart-link").addEventListener("click", toggleCart);
        document.getElementById("buy-button").addEventListener("click", confirmOrder);
        document.getElementById("close-modal").addEventListener("click", closeConfirmation);
        getDataFromServer();
    });
    function toggleCart() {
        document.getElementById("cart-overlay").classList.toggle("active");
    }
    function getDataFromServer() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", AbschlussaufgabeSS19.address + "?getData0", true);
        xhr.addEventListener("readystatechange", handleChangeGetData);
        xhr.send();
    }
    function handleChangeGetData(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response (getData):", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            let response = xhr.response;
            //temp = decodeURIComponent(temp);
            let responseJSON = JSON.parse(response);
            let dataJSON;
            for (let key in responseJSON) {
                let datastring = decodeURI(responseJSON[key].datastring);
                dataJSON = JSON.parse(datastring);
            }
            let configData = [];
            for (let i in dataJSON) {
                configData[parseInt(i)] = {
                    title: dataJSON[i]["title"],
                    type: dataJSON[i]["type"],
                    items: [{ name: null, stock: null, price: null }, { name: null, stock: null, price: null }]
                };
                for (let k = 0; k < dataJSON[i]["items"].length; k++) {
                    configData[parseInt(i)]["items"][k] = {
                        name: dataJSON[i]["items"][k]["name"],
                        stock: dataJSON[i]["items"][k]["stock"],
                        price: dataJSON[i]["items"][k]["price"]
                    };
                }
            }
            console.log("%cConverted Server-Response (getData):", "color: white; background-color: green");
            console.log(configData);
            buildStructure(configData);
        }
    }
    function buildStructure(configData) {
        let categoriesShell = document.getElementById("categories-Shell");
        for (let categoryIndex in configData) {
            let currentCategory = configData[categoryIndex];
            if (currentCategory.type == "Select")
                newCategorySelect(currentCategory);
            else if (currentCategory.type == "Radio")
                newCategoryRadio(currentCategory);
            else
                newCategoryCheckbox(currentCategory);
        }
        function newCategorySelect(_category) {
            let categoryShell = AbschlussaufgabeSS19.createNewElement("div", "category mb-5 border-bottom pb-5", categoriesShell);
            let headline = AbschlussaufgabeSS19.createNewElement("h2", "pb-1", categoryShell);
            headline.innerHTML = _category.title;
            let divContainer = AbschlussaufgabeSS19.createNewElement("div", "mx-5", categoryShell);
            let selectLabel = AbschlussaufgabeSS19.createNewElement("label", "form-check-label text-secondary mb-1", divContainer);
            selectLabel.innerHTML = "Please choose:";
            let inputGroup = AbschlussaufgabeSS19.createNewElement("div", "input-group input-group-lg", divContainer);
            let selectBox = AbschlussaufgabeSS19.createNewElement("select", "custom-select", inputGroup);
            selectBox.addEventListener("change", getFormData);
            for (let item in _category["items"]) {
                let option = AbschlussaufgabeSS19.createNewElement("option", "", selectBox);
                option.innerHTML = _category["items"][item].name;
                option.setAttribute("price", _category["items"][item].price);
            }
        }
        function newCategoryRadio(_category) {
            let categoryShell = AbschlussaufgabeSS19.createNewElement("div", "category mb-5 border-bottom pb-5", categoriesShell);
            let headline = AbschlussaufgabeSS19.createNewElement("h2", "pb-3", categoryShell);
            headline.innerHTML = _category.title;
            let divContainer = AbschlussaufgabeSS19.createNewElement("div", "mx-5", categoryShell);
            for (let item in _category["items"]) {
                let itemName = _category["items"][item].name;
                let itemStock = _category["items"][item].stock;
                let itemPrice = _category["items"][item].price;
                let divItemRow = AbschlussaufgabeSS19.createNewElement("div", "px-3 py-2 mb-2 border rounded item-row", divContainer);
                let divForm = AbschlussaufgabeSS19.createNewElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);
                let radioInput = AbschlussaufgabeSS19.createNewElement("input", "form-check-input cursor-pointer", divForm);
                radioInput.setAttribute("type", "radio");
                radioInput.setAttribute("name", _category.title);
                radioInput.setAttribute("id", itemName);
                radioInput.addEventListener("change", getFormData);
                let placeholder = AbschlussaufgabeSS19.createNewElement("div", "col-1", divForm);
                let nameLabel = AbschlussaufgabeSS19.createNewElement("label", "form-check-label pl-2 cursor-pointer col-4 font-weight-bold", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;
                let stockLabel = AbschlussaufgabeSS19.createNewElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = itemStock + " left in stock";
                let priceLabel = AbschlussaufgabeSS19.createNewElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);
                let euroLabel = AbschlussaufgabeSS19.createNewElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";
            }
        }
        function newCategoryCheckbox(_category) {
            let categoryShell = AbschlussaufgabeSS19.createNewElement("div", "category mb-5 border-bottom pb-5", categoriesShell);
            let headline = AbschlussaufgabeSS19.createNewElement("h2", "pb-3", categoryShell);
            headline.innerHTML = _category.title;
            let divContainer = AbschlussaufgabeSS19.createNewElement("div", "mx-5", categoryShell);
            for (let item in _category["items"]) {
                let itemName = _category["items"][item].name;
                let itemStock = _category["items"][item].stock;
                let itemPrice = _category["items"][item].price;
                let divItemRow = AbschlussaufgabeSS19.createNewElement("div", "px-3 py-2 mb-2 border rounded item-row", divContainer);
                let divForm = AbschlussaufgabeSS19.createNewElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);
                let checkInput = AbschlussaufgabeSS19.createNewElement("input", "form-check-input cursor-pointer", divForm);
                checkInput.setAttribute("type", "checkbox");
                checkInput.setAttribute("name", itemName);
                checkInput.setAttribute("id", itemName);
                checkInput.addEventListener("change", formChangeHandler);
                let placeholder = AbschlussaufgabeSS19.createNewElement("div", "col-1", divForm);
                let nameLabel = AbschlussaufgabeSS19.createNewElement("label", "form-check-label pl-2 cursor-pointer col-4 font-weight-bold", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;
                let stockLabel = AbschlussaufgabeSS19.createNewElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = itemStock + " left in stock";
                let priceLabel = AbschlussaufgabeSS19.createNewElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);
                let euroLabel = AbschlussaufgabeSS19.createNewElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";
            }
        }
    }
    function formChangeHandler() {
        renderCart(getFormData());
    }
    function getFormData() {
        let allArticles = [];
        let articleCounter = 0;
        let categoriesShell = document.getElementById("categories-Shell");
        let allCategories = categoriesShell.children;
        for (let i = 0; i < allCategories.length; i++) {
            let currentCategory = allCategories[i];
            if (currentCategory.getElementsByTagName("select")[0] != undefined) { //SELECT
                let selectBox = currentCategory.getElementsByTagName("select")[0];
                for (let k = 0; k < selectBox.children.length; k++) {
                    if (selectBox.value == selectBox.children[k].innerHTML) {
                        allArticles[articleCounter] = {
                            name: selectBox.value,
                            price: selectBox.children[k].getAttribute("price")
                        };
                    }
                }
                articleCounter++;
            }
            else { // CHECKBOX & RADIO
                let allInputs = currentCategory.getElementsByTagName("input");
                // console.log(allInputs);
                for (let i = 0; i < allInputs.length; i++) {
                    let currentInput = allInputs[i];
                    let itemName = currentInput.nextElementSibling.nextElementSibling.innerHTML;
                    let itemPrice = currentInput.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
                    if (currentInput.checked) {
                        allArticles[articleCounter] = {
                            name: itemName,
                            price: itemPrice
                        };
                        articleCounter++;
                    }
                }
            }
        }
        return allArticles;
    }
    function renderCart(_articles) {
        let cartItemShell = document.getElementById("cart-item-Shell");
        cartItemShell.innerHTML = "";
        let total = 0;
        for (let key in _articles) {
            let itemRow = AbschlussaufgabeSS19.createNewElement("div", "item-row row py-1 rounded mb-1", cartItemShell);
            let itemNumber = AbschlussaufgabeSS19.createNewElement("div", "col-2", itemRow);
            itemNumber.innerHTML = parseInt(key) + 1;
            let itemName = AbschlussaufgabeSS19.createNewElement("div", "col-6", itemRow);
            itemName.innerHTML = _articles[key].name;
            let itemPrice = AbschlussaufgabeSS19.createNewElement("div", "col-3 text-right", itemRow);
            itemPrice.innerHTML = parseFloat(_articles[key].price).toFixed(2).toString();
            total += parseFloat(_articles[key].price);
            let euro = AbschlussaufgabeSS19.createNewElement("div", "col-1", itemRow);
            euro.innerHTML = "€";
        }
        document.getElementById("cart-total").innerHTML = total.toFixed(2).toString();
        let buyButton = document.getElementById("buy-button");
        if (cartItemShell.innerHTML == "")
            buyButton.disabled = true;
        else
            buyButton.disabled = false;
    }
    function confirmOrder() {
        let buyButton = document.getElementById("buy-button");
        buyButton.disabled = true;
        buyButton.classList.toggle("btn-success");
        buyButton.classList.toggle("btn-secondary");
        buyButton.innerHTML = "Processing ...";
        setTimeout(function () {
            checkOrderAndSendData(event);
        }, 300);
    }
    function handleStateChangeOrder(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            let modal = document.getElementById("modal");
            modal.hidden = false;
        }
    }
    function checkOrderAndSendData(_event) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", AbschlussaufgabeSS19.address + "?newOrder" + generateJSONString(), true);
        xhr.addEventListener("readystatechange", handleStateChangeOrder);
        xhr.send();
    }
    function generateJSONString() {
        let allArticles = getFormData();
        let query = JSON.stringify(allArticles);
        return query;
    }
    function closeConfirmation() {
        let modal = document.getElementById("modal");
        modal.hidden = true;
        let buyButton = document.getElementById("buy-button");
        buyButton.disabled = false;
        buyButton.classList.toggle("btn-success");
        buyButton.classList.toggle("btn-secondary");
        buyButton.innerHTML = "Buy Now";
    }
})(AbschlussaufgabeSS19 || (AbschlussaufgabeSS19 = {}));
//# sourceMappingURL=buyer.js.map