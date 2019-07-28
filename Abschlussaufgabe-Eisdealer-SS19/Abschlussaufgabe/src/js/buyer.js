var eisdealer;
(function (eisdealer) {
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("cart-link").addEventListener("click", toggleShoppingCart);
        document.getElementById("buy-button").addEventListener("click", confirmOrder);
        document.getElementById("close-modal").addEventListener("click", closeConfirmation);
        getDataFromServer();
    });
    function toggleShoppingCart() {
        document.getElementById("cart-overlay").classList.toggle("active");
    }
    function getDataFromServer() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", eisdealer.address + "?getData0", true);
        xhr.addEventListener("readystatechange", handleChangeGetData);
        xhr.send();
    }
    function handleChangeGetData(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let response = xhr.response;
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
            console.log(configData);
            buildStructure(configData);
        }
    }
    function buildStructure(configData) {
        let categoriesWrapper = document.getElementById("categories-wrapper");
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
            let categoryWrapper = eisdealer.newElements("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            let headline = eisdealer.newElements("h2", "pb-1", categoryWrapper);
            headline.innerHTML = _category.title;
            let divContainer = eisdealer.newElements("div", "mx-5", categoryWrapper);
            let selectLabel = eisdealer.newElements("label", "form-check-label text-secondary mb-1", divContainer);
            selectLabel.innerHTML = "Please choose:";
            let inputGroup = eisdealer.newElements("div", "input-group input-group-lg", divContainer);
            let selectBox = eisdealer.newElements("select", "custom-select", inputGroup);
            selectBox.addEventListener("change", getData);
            for (let item in _category["items"]) {
                let option = eisdealer.newElements("option", "", selectBox);
                option.innerHTML = _category["items"][item].name;
                option.setAttribute("price", _category["items"][item].price);
            }
        }
        function newCategoryRadio(_category) {
            let categoryWrapper = eisdealer.newElements("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            let headline = eisdealer.newElements("h2", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;
            let divContainer = eisdealer.newElements("div", "mx-5", categoryWrapper);
            for (let item in _category["items"]) {
                let itemName = _category["items"][item].name;
                let itemStock = _category["items"][item].stock;
                let itemPrice = _category["items"][item].price;
                let divItemRow = eisdealer.newElements("div", "px-3 py-2 mb-2 border rounded item-row", divContainer);
                let divForm = eisdealer.newElements("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);
                let radioInput = eisdealer.newElements("input", "form-check-input cursor-pointer", divForm);
                radioInput.setAttribute("type", "radio");
                radioInput.setAttribute("name", _category.title);
                radioInput.setAttribute("id", itemName);
                radioInput.addEventListener("change", getData);
                let placeholder = eisdealer.newElements("div", "col-1", divForm);
                let nameLabel = eisdealer.newElements("label", "form-check-label pl-2 cursor-pointer col-4 font-weight-bold", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;
                let stockLabel = eisdealer.newElements("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = itemStock + " left in stock";
                let priceLabel = eisdealer.newElements("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);
                let euroLogoLabel = eisdealer.newElements("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLogoLabel.setAttribute("for", itemName);
                euroLogoLabel.innerHTML = "€";
            }
        }
        function newCategoryCheckbox(_category) {
            let categoryWrapper = eisdealer.newElements("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            let headline = eisdealer.newElements("h2", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;
            let divContainer = eisdealer.newElements("div", "mx-5", categoryWrapper);
            for (let item in _category["items"]) {
                let itemName = _category["items"][item].name;
                let itemStock = _category["items"][item].stock;
                let itemPrice = _category["items"][item].price;
                let divItemRow = eisdealer.newElements("div", "px-3 py-2 mb-2 border rounded item-row", divContainer);
                let divForm = eisdealer.newElements("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);
                let checkInput = eisdealer.newElements("input", "form-check-input cursor-pointer", divForm);
                checkInput.setAttribute("type", "checkbox");
                checkInput.setAttribute("name", itemName);
                checkInput.setAttribute("id", itemName);
                checkInput.addEventListener("change", ChangeHandler);
                let placeholder = eisdealer.newElements("div", "col-1", divForm);
                let nameLabel = eisdealer.newElements("label", "form-check-label pl-2 cursor-pointer col-4 font-weight-bold", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;
                let stockLabel = eisdealer.newElements("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = itemStock + " left in stock";
                let priceLabel = eisdealer.newElements("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);
                let euroLabel = eisdealer.newElements("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";
            }
        }
    }
    function ChangeHandler() {
        createShoppingCart(getData());
    }
    function getData() {
        let allArticles = [];
        let articleCounter = 0;
        let categoriesWrapper = document.getElementById("categories-wrapper");
        let allCategories = categoriesWrapper.children;
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
            // checkbox und radiobuttons
            else {
                let allInputs = currentCategory.getElementsByTagName("input");
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
    function createShoppingCart(_articles) {
        let cartItemWrapper = document.getElementById("cart-item-wrapper");
        cartItemWrapper.innerHTML = "";
        let total = 0;
        for (let key in _articles) {
            let itemRow = eisdealer.newElements("div", "item-row row py-1 rounded mb-1", cartItemWrapper);
            let itemNumber = eisdealer.newElements("div", "col-2", itemRow);
            itemNumber.innerHTML = parseInt(key) + 1;
            let itemName = eisdealer.newElements("div", "col-6", itemRow);
            itemName.innerHTML = _articles[key].name;
            let itemPrice = eisdealer.newElements("div", "col-3 text-right", itemRow);
            itemPrice.innerHTML = parseFloat(_articles[key].price).toFixed(2).toString();
            total += parseFloat(_articles[key].price);
            let euro = eisdealer.newElements("div", "col-1", itemRow);
            euro.innerHTML = "€";
        }
        document.getElementById("cart-total").innerHTML = total.toFixed(2).toString();
        let buyButton = document.getElementById("buy-button");
        if (cartItemWrapper.innerHTML == "")
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
            SendOrderData(event);
        }, 300);
    }
    function handleChangeOrder(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let modal = document.getElementById("modal");
            modal.hidden = false;
        }
    }
    function SendOrderData(_event) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", eisdealer.address + "?newOrder" + generateJSONString(), true);
        xhr.addEventListener("readystatechange", handleChangeOrder);
        xhr.send();
    }
    function generateJSONString() {
        let allArticles = getData();
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
})(eisdealer || (eisdealer = {}));
//# sourceMappingURL=buyer.js.map