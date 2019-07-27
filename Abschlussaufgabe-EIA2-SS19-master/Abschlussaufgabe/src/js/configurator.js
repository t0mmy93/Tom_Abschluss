var AbschlussaufgabeSS19;
(function (AbschlussaufgabeSS19) {
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("add-category").addEventListener("click", addCategoryAtClick);
        let removeCategoryButtons = document.getElementsByClassName("remove-category");
        let addItemButtons = document.getElementsByClassName("add-item");
        let removeItemButtons = document.getElementsByClassName("remove-item");
        for (let i = 0; i < removeCategoryButtons.length; i++) {
            removeCategoryButtons[i].addEventListener("click", removeCategoryAtClick);
        }
        for (let i = 0; i < addItemButtons.length; i++) {
            addItemButtons[i].addEventListener("click", addItemAtClick);
        }
        for (let i = 0; i < removeItemButtons.length; i++) {
            removeItemButtons[i].addEventListener("click", removeItemAtClick);
        }
        document.getElementById("save-button").addEventListener("click", sendData);
        getDataFromServer();
    });
    function getDataFromServer() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", AbschlussaufgabeSS19.address + "?getData0", true);
        xhr.addEventListener("readystatechange", handleStateChangeGetData);
        xhr.send();
    }
    function handleStateChangeGetData(_event) {
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
    function addCategoryAtClick() {
        addCategory("", "");
    }
    function addCategory(_categoryName, _categoryType) {
        let categoryOptions = ["Select Form Type", "Radio", "Checkbox", "Select"];
        let divAllCategories = document.getElementsByClassName("categories-wrapper")[0];
        let divAddButton = document.getElementById("add-category");
        // HTML structure Category
        let divCategory = AbschlussaufgabeSS19.newElement("div", "category mb-5 border-bottom pb-2", divAllCategories);
        let divCategoryRow = AbschlussaufgabeSS19.newElement("div", "category-row row py-2 mb-3", divCategory);
        let divRowCol = AbschlussaufgabeSS19.newElement("div", "col-12 col-lg-9 mb-2 mb-lg-0", divCategoryRow);
        let divInputGroup = AbschlussaufgabeSS19.newElement("div", "input-group input-group-lg", divRowCol);
        // INPUT GROUP
        let inputCategoryName = AbschlussaufgabeSS19.newElement("input", "form-control", divInputGroup);
        inputCategoryName.setAttribute("type", "text");
        inputCategoryName.setAttribute("placeholder", "Category-Name");
        if (_categoryName != "")
            inputCategoryName.value = _categoryName;
        let selectCategoryType = AbschlussaufgabeSS19.newElement("select", "custom-select", divInputGroup);
        for (let i = 0; i < categoryOptions.length; i++) {
            let option = AbschlussaufgabeSS19.newElement("option", "", selectCategoryType);
            option.innerHTML = categoryOptions[i];
        }
        if (_categoryType != "")
            selectCategoryType.value = _categoryType;
        // REMOVE CATEGORY BUTTON
        let divButtonRemoveCategory = AbschlussaufgabeSS19.newElement("div", "col-12 col-lg-3 justify-content-end d-flex", divCategoryRow);
        let buttonRemoveCategory = AbschlussaufgabeSS19.newElement("button", "btn btn-outline-danger w-100", divButtonRemoveCategory);
        buttonRemoveCategory.setAttribute("type", "button");
        buttonRemoveCategory.innerHTML = "Remove Category";
        buttonRemoveCategory.addEventListener("click", removeCategoryAtClick);
        // ITEM WRAPPER
        let divItemWrapper = AbschlussaufgabeSS19.newElement("div", "items-wrapper", divCategory);
        //addItem(divItemWrapper);
        // ADD ITEM BUTTON 
        let divAddItemRow = AbschlussaufgabeSS19.newElement("div", "add-item-row row py-2 justify-content-end", divItemWrapper);
        let divAddItemCol = AbschlussaufgabeSS19.newElement("div", "col-lg-2 justify-content-end d-flex", divAddItemRow);
        let buttonAddItem = AbschlussaufgabeSS19.newElement("button", "add-item btn btn-outline-success w-100", divAddItemCol);
        buttonAddItem.setAttribute("type", "button");
        buttonAddItem.innerHTML = "+ Add Item";
        buttonAddItem.addEventListener("click", addItemAtClick);
        return divCategory;
        /*
        
                <div class="category mb-5 border-bottom pb-2">
                    <div class="category-row row py-2 mb-3">
                        <div class="col-12 col-lg-9 mb-lg-0">
                            <div class="input-group input-group-lg">
    
                                <input type="text" class="form-control" placeholder="Category-Name">
    
                                <select class="custom-select">
                                    <option>Select Form Type</option>
                                    <option>Radio</option>
                                    <option>Radio</option>
                                    <option>Checkbox</option>
                                    <option>Select</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12 col-lg-3  justify-content-end d-flex">
                            <button type="button" class="btn btn-outline-danger w-100">Remove Category</button>
                        </div>
                    </div>
                    <div class="items-wrapper">
                        <div class="row py-2 justify-content-start">
                            <div class="col-lg-1"></div>
                            <div class="col-lg-9">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Item-Name">
                                    <input type="number" class="form-control" placeholder="Stock">
                                    <input type="number" class="form-control" placeholder="Price">
                                    <div class="input-group-append">
                                        <span class=""input-group-text"">€</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 justify-content-end d-flex">
                                <button type="button" class="btn btn-outline-danger w-100">Remove Item</button>
                            </div>
                        </div>
                        <div class="add-item-row row py-2 justify-content-end">
                            <div class="col-lg-2 justify-content-end d-flex">
                                <button type="button" class="btn btn-outline-success w-100">+ Add Item</button>
                            </div>
                        </div>
                    </div>
                </div>
    
    */
    }
    function addItemAtClick(_event) {
        let target = _event.target;
        let targetItemWrapper = target.parentElement.parentElement.parentElement;
        addItem(targetItemWrapper, "", "", "");
    }
    function addItem(_targetWrapper, _itemName, _itemStock, _itemPrice) {
        let divItemRow = AbschlussaufgabeSS19.newElement("div", "row py-2 justify-content-start", null);
        _targetWrapper.insertBefore(divItemRow, _targetWrapper.children[(_targetWrapper.children.length - 1)]);
        let divItemRowCol1 = AbschlussaufgabeSS19.newElement("div", "col-lg-1 mb-2 mb-lg-0", divItemRow);
        let divItemRowCol9 = AbschlussaufgabeSS19.newElement("div", "col-lg-9 mb-2 mb-lg-0", divItemRow);
        let divItemInputGroup = AbschlussaufgabeSS19.newElement("div", "input-group", divItemRowCol9);
        // INPUT GROUP
        let inputItemName = AbschlussaufgabeSS19.newElement("input", "form-control", divItemInputGroup);
        inputItemName.setAttribute("type", "text");
        inputItemName.setAttribute("placeholder", "Item-Name");
        if (_itemName != "")
            inputItemName.value = _itemName;
        let inputItemStock = AbschlussaufgabeSS19.newElement("input", "form-control", divItemInputGroup);
        inputItemStock.setAttribute("type", "text");
        inputItemStock.setAttribute("placeholder", "Stock");
        if (_itemName != "")
            inputItemStock.value = _itemStock;
        let inputItemPrice = AbschlussaufgabeSS19.newElement("input", "form-control", divItemInputGroup);
        inputItemPrice.setAttribute("type", "text");
        inputItemPrice.setAttribute("placeholder", "Price");
        if (_itemName != "")
            inputItemPrice.value = _itemPrice;
        let divSpanAppend = AbschlussaufgabeSS19.newElement("div", "input-group-append", divItemInputGroup);
        let spanAppend = document.createElement("span");
        spanAppend.classList.add("input-group-text");
        spanAppend.innerHTML = "€";
        divSpanAppend.append(spanAppend);
        // REMOVE ITEM BUTTON
        let divButtonRemoveItem = AbschlussaufgabeSS19.newElement("div", "col-lg-2 justify-content-end d-flex", divItemRow);
        let buttonRemoveItem = AbschlussaufgabeSS19.newElement("button", "btn btn-outline-danger w-100", divButtonRemoveItem);
        buttonRemoveItem.setAttribute("type", "button");
        buttonRemoveItem.innerHTML = "Remove Item";
        buttonRemoveItem.addEventListener("click", removeItemAtClick);
    }
    function removeItemAtClick(_event) {
        let target = _event.target;
        let targetItemWrapper = target.parentElement.parentElement.parentElement;
        let allItems = targetItemWrapper.children;
        let index;
        for (let i = 0; i < allItems.length; i++) {
            if (target.parentNode.parentNode == allItems[i]) // allItems is div container around target which is a button
                index = i;
        }
        let elementToRemove = allItems[index];
        let nameInput = elementToRemove.children[1].children[0].children[0];
        let stockInput = elementToRemove.children[1].children[0].children[1];
        let priceInput = elementToRemove.children[1].children[0].children[3];
        let itemName = nameInput.value;
        let itemStock = stockInput.value;
        let itemPrice = priceInput.value;
        if (itemName === "" && itemStock === "" && itemPrice === undefined)
            elementToRemove.remove();
        else {
            if (itemName === "")
                itemName = "Unlabeled Item";
            AbschlussaufgabeSS19.toggleModal("item", itemName, elementToRemove, false);
        }
    }
    function removeCategoryAtClick(_event) {
        let target = _event.target;
        let elementToRemove = target.parentElement.parentElement.parentElement;
        let nameInput = elementToRemove.children[0].children[0].children[0].children[0];
        let categoryName = nameInput.value;
        if (categoryName === "")
            categoryName = "Unlabeled Category";
        AbschlussaufgabeSS19.toggleModal("category", categoryName, elementToRemove, false);
    }
    function getForm() {
        let categoriesWrapper = document.getElementById("categories-wrapper");
        let configData = [];
        // GET CATEGORIES
        for (let i = 0; i < categoriesWrapper.children.length; i++) {
            let currentCategory = categoriesWrapper.children[i];
            let titleInput = currentCategory.children[0].children[0].children[0].children[0];
            let typeInput = currentCategory.children[0].children[0].children[0].children[1];
            let categoryTitle = titleInput.value;
            let categoryType = typeInput.value;
            configData[i] = {
                title: categoryTitle,
                type: categoryType,
                items: [
                    {
                        name: null,
                        stock: null,
                        price: null
                    }
                ]
            };
            // GET ITEMS
            let itemWrapper = currentCategory.children[1];
            for (let k = 0; k < itemWrapper.children.length - 1; k++) {
                let currentItem = itemWrapper.children[k];
                let nameInput = currentItem.children[1].children[0].children[0];
                let stockInput = currentItem.children[1].children[0].children[1];
                let priceInput = currentItem.children[1].children[0].children[2];
                let itemName = nameInput.value;
                let itemStock = stockInput.value;
                let itemPrice = priceInput.value;
                configData[i].items[k] = {
                    name: itemName,
                    stock: parseFloat(itemStock),
                    price: parseFloat(itemPrice)
                };
            }
        }
        return configData;
    }
    function sendData() {
        let configData = getForm();
        let xhr = new XMLHttpRequest();
        let query = convertDataToQuery(configData);
        xhr.open("GET", AbschlussaufgabeSS19.address + "?saveData" + query, true);
        xhr.addEventListener("readystatechange", handleStateChangeSaveData);
        xhr.send();
    }
    function handleStateChangeSaveData(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response:", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            console.log("%cConverted Server-Response:", "color: white; background-color: green");
            let temp = xhr.response.replace(/%22/g, '"');
            temp = temp.replace(/%20/g, " ");
            temp = temp.slice(10);
            let configData = JSON.parse(temp);
            console.log(configData);
            //buildStructure(configData);
        }
    }
    function convertDataToQuery(_data) {
        let query = JSON.stringify(_data);
        console.log(query);
        return query;
    }
    function buildStructure(_configData) {
        for (let i in _configData) {
            let category = addCategory(_configData[i].title, _configData[i].type);
            let itemWrapperDiv = category.getElementsByClassName("items-wrapper")[0];
            for (let k in _configData[i].items) {
                addItem(itemWrapperDiv, _configData[i].items[k].name, _configData[i].items[k].stock, _configData[i].items[k].price);
            }
        }
    }
})(AbschlussaufgabeSS19 || (AbschlussaufgabeSS19 = {}));
//# sourceMappingURL=configurator.js.map