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
        xhr.open("GET", address + "?getData0", true);
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
        const categoriesWrapper = document.getElementById("categories-wrapper");
        for (let categoryIndex in configData) {
            const currentCategory = configData[categoryIndex];
            if (currentCategory.type == "Select")
                newCategorySelect(currentCategory);
            else if (currentCategory.type == "Radio")
                newCategoryRadio(currentCategory);
            else
                newCategoryCheckbox(currentCategory);
        }
        function newCategorySelect(_category) {
            const categoryWrapper = newElement("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            const headline = newElement("h2", "pb-1", categoryWrapper);
            headline.innerHTML = _category.title;
            const divContainer = newElement("div", "mx-5", categoryWrapper);
            const selectLabel = newElement("label", "form-check-label text-secondary mb-1", divContainer);
            selectLabel.innerHTML = "Please choose:";
            const inputGroup = newElement("div", "input-group input-group-lg", divContainer);
            const selectBox = newElement("select", "custom-select", inputGroup);
            selectBox.addEventListener("change", getFormData);
            for (let item in _category["items"]) {
                const option = newElement("option", "", selectBox);
                option.innerHTML = _category["items"][item].name;
                option.setAttribute("price", _category["items"][item].price);
            }
        }
        function newCategoryRadio(_category) {
            const categoryWrapper = newElement("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            const headline = newElement("h2", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;
            const divContainer = newElement("div", "mx-5", categoryWrapper);
            for (let item in _category["items"]) {
                const itemName = _category["items"][item].name;
                const itemStock = _category["items"][item].stock;
                const itemPrice = _category["items"][item].price;
                const divItemRow = newElement("div", "px-3 py-2 mb-2 border rounded item-row", divContainer);
                const divForm = newElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);
                const radioInput = newElement("input", "form-check-input cursor-pointer", divForm);
                radioInput.setAttribute("type", "radio");
                radioInput.setAttribute("name", _category.title);
                radioInput.setAttribute("id", itemName);
                radioInput.addEventListener("change", getFormData);
                const placeholder = newElement("div", "col-1", divForm);
                const nameLabel = newElement("label", "form-check-label pl-2 cursor-pointer col-4 font-weight-bold", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;
                const stockLabel = newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = itemStock + " left in stock";
                const priceLabel = newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);
                const euroLabel = newElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";
            }
        }
        function newCategoryCheckbox(_category) {
            const categoryWrapper = newElement("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            const headline = newElement("h2", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;
            const divContainer = newElement("div", "mx-5", categoryWrapper);
            for (let item in _category["items"]) {
                const itemName = _category["items"][item].name;
                const itemStock = _category["items"][item].stock;
                const itemPrice = _category["items"][item].price;
                const divItemRow = newElement("div", "px-3 py-2 mb-2 border rounded item-row", divContainer);
                const divForm = newElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);
                const checkInput = newElement("input", "form-check-input cursor-pointer", divForm);
                checkInput.setAttribute("type", "checkbox");
                checkInput.setAttribute("name", itemName);
                checkInput.setAttribute("id", itemName);
                checkInput.addEventListener("change", formChangeHandler);
                const placeholder = newElement("div", "col-1", divForm);
                const nameLabel = newElement("label", "form-check-label pl-2 cursor-pointer col-4 font-weight-bold", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;
                const stockLabel = newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = itemStock + " left in stock";
                const priceLabel = newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);
                const euroLabel = newElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
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
        const categoriesWrapper = document.getElementById("categories-wrapper");
        const allCategories = categoriesWrapper.children;
        for (let i = 0; i < allCategories.length; i++) {
            const currentCategory = allCategories[i];
            if (currentCategory.getElementsByTagName("select")[0] != undefined) { //SELECT
                const selectBox = currentCategory.getElementsByTagName("select")[0];
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
                const allInputs = currentCategory.getElementsByTagName("input");
                // console.log(allInputs);
                for (let i = 0; i < allInputs.length; i++) {
                    const currentInput = allInputs[i];
                    const itemName = currentInput.nextElementSibling.nextElementSibling.innerHTML;
                    const itemPrice = currentInput.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
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
        const cartItemWrapper = document.getElementById("cart-item-wrapper");
        cartItemWrapper.innerHTML = "";
        let total = 0;
        for (let key in _articles) {
            const itemRow = newElement("div", "item-row row py-1 rounded mb-1", cartItemWrapper);
            const itemNumber = newElement("div", "col-2", itemRow);
            itemNumber.innerHTML = parseInt(key) + 1;
            const itemName = newElement("div", "col-6", itemRow);
            itemName.innerHTML = _articles[key].name;
            const itemPrice = newElement("div", "col-3 text-right", itemRow);
            itemPrice.innerHTML = parseFloat(_articles[key].price).toFixed(2).toString();
            total += parseFloat(_articles[key].price);
            const euro = newElement("div", "col-1", itemRow);
            euro.innerHTML = "€";
        }
        document.getElementById("cart-total").innerHTML = total.toFixed(2).toString();
        const buyButton = document.getElementById("buy-button");
        if (cartItemWrapper.innerHTML == "")
            buyButton.disabled = true;
        else
            buyButton.disabled = false;
    }
    function confirmOrder() {
        const buyButton = document.getElementById("buy-button");
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
            const modal = document.getElementById("modal");
            modal.hidden = false;
        }
    }
    function checkOrderAndSendData(_event) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", address + "?newOrder" + generateJSONString(), true);
        xhr.addEventListener("readystatechange", handleStateChangeOrder);
        xhr.send();
    }
    function generateJSONString() {
        const allArticles = getFormData();
        let query = JSON.stringify(allArticles);
        return query;
    }
    function closeConfirmation() {
        const modal = document.getElementById("modal");
        modal.hidden = true;
        const buyButton = document.getElementById("buy-button");
        buyButton.disabled = false;
        buyButton.classList.toggle("btn-success");
        buyButton.classList.toggle("btn-secondary");
        buyButton.innerHTML = "Buy Now";
    }
})(AbschlussaufgabeSS19 || (AbschlussaufgabeSS19 = {}));
//# sourceMappingURL=buyer.js.map