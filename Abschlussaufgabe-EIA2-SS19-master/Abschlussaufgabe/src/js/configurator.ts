namespace eisdealer {

    document.addEventListener("DOMContentLoaded", function (): void {

        document.getElementById("add-category").addEventListener("click", clickToAddCategory);
        let removeCategoryButtons: HTMLCollection = document.getElementsByClassName("remove-category");
        let addItemButtons: HTMLCollection = document.getElementsByClassName("add-item");
        let removeItemButtons: HTMLCollection = document.getElementsByClassName("remove-item");

        for (let i: number = 0; i < removeCategoryButtons.length; i++) {
            removeCategoryButtons[i].addEventListener("click", clickToRemoveCategory);
        }
        for (let i: number = 0; i < addItemButtons.length; i++) {
            addItemButtons[i].addEventListener("click", clickToAddItem);
        }
        for (let i: number = 0; i < removeItemButtons.length; i++) {
            removeItemButtons[i].addEventListener("click", clickToRemoveItem);
        }

        document.getElementById("save-button").addEventListener("click", sendData);

        getDataFromServer();
    });

    function getDataFromServer(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?getData0", true);
        xhr.addEventListener("readystatechange", handleChangeGetData);
        xhr.send();
    }

    function handleChangeGetData(_event: Event): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response (getData):", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);

            let response: string = xhr.response;
            let responseJSON: JSON = JSON.parse(response);
            let dataJSON: JSON;

            for (let key in responseJSON) {
                let datastring: string = decodeURI(responseJSON[key].datastring);
                dataJSON = JSON.parse(datastring);
            }

            let configData: Categories = [];

            for (let i in dataJSON) {
                configData[parseInt(i)] = {
                    title: dataJSON[i]["title"],
                    type: dataJSON[i]["type"],
                    items: [{ name: null, stock: null, price: null }, { name: null, stock: null, price: null }]
                };

                for (let k: number = 0; k < dataJSON[i]["items"].length; k++) {
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

    function clickToAddCategory(): void {
        addCategory("", "");
    }

    function addCategory(_categoryName: string, _categoryType: string): HTMLElement {
        let categoryOptions: string[] = ["Select Form Type", "Radio", "Checkbox", "Select"];

        let divAllCategories: HTMLDivElement = <HTMLDivElement>document.getElementsByClassName("categories-wrapper")[0];
        let divAddButton: HTMLDivElement = <HTMLDivElement>document.getElementById("add-category");

        // HTML structure Category

        let divCategory: HTMLDivElement = <HTMLDivElement>createNewElement("div", "category mb-5 border-bottom pb-2", divAllCategories);
        let divCategoryRow: HTMLDivElement = <HTMLDivElement>createNewElement("div", "category-row row py-2 mb-3", divCategory);
        let divRowCol: HTMLDivElement = <HTMLDivElement>createNewElement("div", "col-10 col-lg-9 mb-2 mb-lg-0", divCategoryRow);
        let divInputGroup: HTMLDivElement = <HTMLDivElement>createNewElement("div", "input-group input-group-lg", divRowCol);


        // INPUT GROUP

        let inputCategoryName: HTMLInputElement = <HTMLInputElement>createNewElement("input", "form-control", divInputGroup);
        inputCategoryName.setAttribute("type", "text");
        inputCategoryName.setAttribute("placeholder", "Category-Name");
        if (_categoryName != "")
            inputCategoryName.value = _categoryName;

        let selectCategoryType: HTMLSelectElement = <HTMLSelectElement>createNewElement("select", "custom-select", divInputGroup);

        for (let i: number = 0; i < categoryOptions.length; i++) {
            let option: HTMLOptionElement = <HTMLOptionElement>createNewElement("option", "", selectCategoryType);
            option.innerHTML = categoryOptions[i];
        }

        if (_categoryType != "")
            selectCategoryType.value = _categoryType;

        // REMOVE CATEGORY BUTTON

        let divButtonRemoveCategory: HTMLDivElement = <HTMLDivElement>createNewElement("div", "col-10 col-lg-3 justify-content-end d-flex", divCategoryRow);
        let buttonRemoveCategory: HTMLButtonElement = <HTMLButtonElement>createNewElement("button", "btn btn-outline-danger w-100", divButtonRemoveCategory);
        buttonRemoveCategory.setAttribute("type", "button");
        buttonRemoveCategory.innerHTML = "Remove Category";
        buttonRemoveCategory.addEventListener("click", clickToRemoveCategory);

        let divItemwrapper: HTMLDivElement = <HTMLDivElement>createNewElement("div", "items-wrapper", divCategory);


        // ADD ITEM BUTTON 

        let divAddItemRow: HTMLDivElement = <HTMLDivElement>createNewElement("div", "add-item-row row py-2 justify-content-end", divItemwrapper);
        let divAddItemCol: HTMLDivElement = <HTMLDivElement>createNewElement("div", "col-lg-2 justify-content-end d-flex", divAddItemRow);

        let buttonAddItem: HTMLButtonElement = <HTMLButtonElement>createNewElement("button", "add-item btn btn-outline-success w-100", divAddItemCol);
        buttonAddItem.setAttribute("type", "button");
        buttonAddItem.innerHTML = "+ Add Item";
        buttonAddItem.addEventListener("click", clickToAddItem);

        return divCategory;



    }

    function clickToAddItem(_event: Event): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let targetItemwrapper: HTMLDivElement = <HTMLDivElement>target.parentElement.parentElement.parentElement;

        addItem(targetItemwrapper, "", "", "");
    }

    function addItem(_targetwrapper: HTMLDivElement, _itemName: string, _itemStock: string, _itemPrice: string): void {

        let divItemRow: HTMLDivElement = <HTMLDivElement>createNewElement("div", "row py-2 justify-content-start", null);

        _targetwrapper.insertBefore(divItemRow, _targetwrapper.children[(_targetwrapper.children.length - 1)]);

        let divItemRowCol1: HTMLDivElement = <HTMLDivElement>createNewElement("div", "col-lg-1 mb-2 mb-lg-0", divItemRow);
        let divItemRowCol9: HTMLDivElement = <HTMLDivElement>createNewElement("div", "col-lg-9 mb-2 mb-lg-0", divItemRow);
        let divItemInputGroup: HTMLDivElement = <HTMLDivElement>createNewElement("div", "input-group", divItemRowCol9);

        
        let inputItemName: HTMLInputElement = <HTMLInputElement>createNewElement("input", "form-control", divItemInputGroup);
        inputItemName.setAttribute("type", "text");
        inputItemName.setAttribute("placeholder", "Item-Name");
        if (_itemName != "")
            inputItemName.value = _itemName;

        let inputItemStock: HTMLInputElement = <HTMLInputElement>createNewElement("input", "form-control", divItemInputGroup);
        inputItemStock.setAttribute("type", "text");
        inputItemStock.setAttribute("placeholder", "Stock");
        if (_itemName != "")
            inputItemStock.value = _itemStock;

        let inputItemPrice: HTMLInputElement = <HTMLInputElement>createNewElement("input", "form-control", divItemInputGroup);
        inputItemPrice.setAttribute("type", "text");
        inputItemPrice.setAttribute("placeholder", "Price");
        if (_itemName != "")
            inputItemPrice.value = _itemPrice;

        let divSpanAppend: HTMLDivElement = <HTMLDivElement>createNewElement("div", "input-group-append", divItemInputGroup);
        let spanAppend: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
        spanAppend.classList.add("input-group-text");
        spanAppend.innerHTML = "€";
        divSpanAppend.append(spanAppend);

       
        let divButtonRemoveItem: HTMLDivElement = <HTMLDivElement>createNewElement("div", "col-lg-2 justify-content-end d-flex", divItemRow);
        let buttonRemoveItem: HTMLButtonElement = <HTMLButtonElement>createNewElement("button", "btn btn-outline-danger w-100", divButtonRemoveItem);
        buttonRemoveItem.setAttribute("type", "button");
        buttonRemoveItem.innerHTML = "Remove Item";
        buttonRemoveItem.addEventListener("click", clickToRemoveItem);

    }

    function clickToRemoveItem(_event: Event): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let targetItemwrapper: HTMLDivElement = <HTMLDivElement>target.parentElement.parentElement.parentElement;
        let allItems: HTMLCollection = targetItemwrapper.children;
        let index: number;

        for (let i: number = 0; i < allItems.length; i++) {
            if (target.parentNode.parentNode == allItems[i])
                index = i;
        }

        let elementToRemove: HTMLElement = <HTMLElement>allItems[index];
        let nameInput: HTMLInputElement = <HTMLInputElement>elementToRemove.children[1].children[0].children[0];
        let stockInput: HTMLInputElement = <HTMLInputElement>elementToRemove.children[1].children[0].children[1];
        let priceInput: HTMLInputElement = <HTMLInputElement>elementToRemove.children[1].children[0].children[3];
        let itemName: string = nameInput.value;
        let itemStock: string = stockInput.value;
        let itemPrice: string = priceInput.value;

        if (itemName === "" && itemStock === "" && itemPrice === undefined)
            elementToRemove.remove();
        else {
            if (itemName === "")
                itemName = "Unknown Item";

            toggleModal("item", itemName, elementToRemove, false);
        }
    }





    function getForm(): Object {
        let categorieswrapper: HTMLDivElement = <HTMLDivElement>document.getElementById("categories-wrapper");
        let configData: Categories = [];



        for (let i: number = 0; i < categorieswrapper.children.length; i++) {
            let currentCategory: HTMLDivElement = <HTMLDivElement>categorieswrapper.children[i];
            let titleInput: HTMLInputElement = <HTMLInputElement>currentCategory.children[0].children[0].children[0].children[0];
            let typeInput: HTMLInputElement = <HTMLInputElement>currentCategory.children[0].children[0].children[0].children[1];
            let categoryTitle: string = titleInput.value;
            let categoryType: string = typeInput.value;

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



            let itemwrapper: HTMLDivElement = <HTMLDivElement>currentCategory.children[1];

            for (let k: number = 0; k < itemwrapper.children.length - 1; k++) {

                let currentItem: HTMLDivElement = <HTMLDivElement>itemwrapper.children[k];
                let nameInput: HTMLInputElement = <HTMLInputElement>currentItem.children[1].children[0].children[0];
                let stockInput: HTMLInputElement = <HTMLInputElement>currentItem.children[1].children[0].children[1];
                let priceInput: HTMLInputElement = <HTMLInputElement>currentItem.children[1].children[0].children[2];
                let itemName: string = nameInput.value;
                let itemStock: string = stockInput.value;
                let itemPrice: string = priceInput.value;

                configData[i].items[k] = {
                    name: itemName,
                    stock: parseFloat(itemStock),
                    price: parseFloat(itemPrice)
                };
            }
        }
        return configData;
    }

    function sendData(): void {
        let configData: Object = getForm();
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        let query: string = convertDataToQuery(configData);
        xhr.open("GET", address + "?saveData" + query, true);
        xhr.addEventListener("readystatechange", handleChangeSaveData);
        xhr.send();
    }

    function clickToRemoveCategory(_event: Event): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let elementToRemove: HTMLDivElement = <HTMLDivElement>target.parentElement.parentElement.parentElement;
        let nameInput: HTMLInputElement = <HTMLInputElement>elementToRemove.children[0].children[0].children[0].children[0];
        let categoryName: string = nameInput.value;

        if (categoryName === "")
            categoryName = "Unknown Category";
        toggleModal("category", categoryName, elementToRemove, false);

    }

    function handleChangeSaveData(_event: ProgressEvent): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response:", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);
            console.log("%cConverted Server-Response:", "color: white; background-color: green");

            let temp: string = xhr.response.replace(/%22/g, '"');
            temp = temp.replace(/%20/g, " ");
            temp = temp.slice(10);

            let configData: JSON = JSON.parse(temp);
            console.log(configData);
        }
    }

    function convertDataToQuery(_data: Object): string {
        let query: string = JSON.stringify(_data);
        console.log(query);
        return query;
    }

    function buildStructure(_configData: Object): void {
        for (let i in _configData) {
            let category: HTMLElement = addCategory(_configData[i].title, _configData[i].type);
            let itemwrapperDiv: HTMLDivElement = <HTMLDivElement>category.getElementsByClassName("items-wrapper")[0];


            for (let k in _configData[i].items) {
                addItem(itemwrapperDiv, _configData[i].items[k].name, _configData[i].items[k].stock, _configData[i].items[k].price);
            }
        }
    }
}