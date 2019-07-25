namespace AbschlussaufgabeSS19 {

    document.addEventListener("DOMContentLoaded", function (): void {
        document.getElementById("cart-link").addEventListener("click", toggleCart);
        document.getElementById("buy-button").addEventListener("click", confirmOrder)
        document.getElementById("close-modal").addEventListener("click", closeConfirmation);
        getDataFromServer();
    });

    function toggleCart(): void {
        document.getElementById("cart-overlay").classList.toggle("active");
    }

    function getDataFromServer(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?getData0", true);
        xhr.addEventListener("readystatechange", handleStateChangeGetData);
        xhr.send();
    } 

    function handleStateChangeGetData(_event: Event): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("%cServer Response (getData):", "color: white; background-color: blue");
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);

            let response: string = xhr.response;
            //temp = decodeURIComponent(temp);
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

    function buildStructure(configData: JSON): void {
        const categoriesWrapper: HTMLDivElement = <HTMLDivElement>document.getElementById("categories-wrapper");

        for (let categoryIndex in configData) {
            const currentCategory: JSON = configData[categoryIndex];

            if (currentCategory.type == "Select")
                newSelectCategory(currentCategory);

            else if (currentCategory.type == "Radio")
                newRadioCategory(currentCategory);

            else
                newCheckboxCategory(currentCategory);
        }

        function newSelectCategory(_category: JSON): void {
            const categoryWrapper: HTMLElement = newElement("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            const headline: HTMLElement = newElement("h2", "pb-1", categoryWrapper);
            headline.innerHTML = _category.title;

            const divContainer: HTMLElement = newElement("div", "mx-5", categoryWrapper);
            const selectLabel: HTMLElement = newElement("label", "form-check-label text-secondary mb-1", divContainer);
            selectLabel.innerHTML = "Please choose:";

            const inputGroup: HTMLElement = newElement("div", "input-group input-group-lg", divContainer);
            const selectBox: HTMLElement = newElement("select", "custom-select", inputGroup);

            selectBox.addEventListener("change", getFormData);

            for (let item in _category["items"]) {
                const option: HTMLElement = newElement("option", "", selectBox);
                option.innerHTML = _category["items"][item].name;
                option.setAttribute("price", _category["items"][item].price)
            }

        }

        function newRadioCategory(_category: JSON): void {
            const categoryWrapper: HTMLElement = newElement("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            const headline: HTMLElement = newElement("h2", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;

            const divContainer: HTMLElement = newElement("div", "mx-5", categoryWrapper);

            for (let item in _category["items"]) {
                const itemName: string = _category["items"][item].name;
                const itemStock: string = _category["items"][item].stock;
                const itemPrice: string = _category["items"][item].price;

                const divItemRow: HTMLElement = newElement("div", "px-3 py-2 mb-2 border rounded item-row", divContainer);
                const divForm: HTMLElement = newElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);

                const radioInput: HTMLElement = newElement("input", "form-check-input cursor-pointer", divForm);
                radioInput.setAttribute("type", "radio");
                radioInput.setAttribute("name", _category.title);
                radioInput.setAttribute("id", itemName);

                radioInput.addEventListener("change", getFormData);


                const placeholder: HTMLElement = newElement("div", "col-1", divForm);

                const nameLabel: HTMLElement = newElement("label", "form-check-label pl-2 cursor-pointer col-4 font-weight-bold", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;

                const stockLabel: HTMLElement = newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = itemStock + " left in stock";

                const priceLabel: HTMLElement = newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);

                const euroLabel: HTMLElement = newElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";
            }

        }

        function newCheckboxCategory(_category: JSON): void {
            const categoryWrapper: HTMLElement = newElement("div", "category mb-5 border-bottom pb-5", categoriesWrapper);
            const headline: HTMLElement = newElement("h2", "pb-3", categoryWrapper);
            headline.innerHTML = _category.title;

            const divContainer: HTMLElement = newElement("div", "mx-5", categoryWrapper);

            for (let item in _category["items"]) {
                const itemName: string = _category["items"][item].name;
                const itemStock: string = _category["items"][item].stock;
                const itemPrice: string = _category["items"][item].price;

                const divItemRow: HTMLElement = newElement("div", "px-3 py-2 mb-2 border rounded item-row", divContainer);
                const divForm: HTMLElement = newElement("div", "form-check p-1 cursor-pointer px-4 ml-3 row justify-content-between d-flex", divItemRow);

                const checkInput: HTMLElement = newElement("input", "form-check-input cursor-pointer", divForm);
                checkInput.setAttribute("type", "checkbox");
                checkInput.setAttribute("name", itemName);
                checkInput.setAttribute("id", itemName);

                checkInput.addEventListener("change", formChangeHandler);

                const placeholder: HTMLElement = newElement("div", "col-1", divForm);

                const nameLabel: HTMLElement = newElement("label", "form-check-label pl-2 cursor-pointer col-4 font-weight-bold", divForm);
                nameLabel.setAttribute("for", itemName);
                nameLabel.innerHTML = itemName;

                const stockLabel: HTMLElement = newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-muted text-right", divForm);
                stockLabel.setAttribute("for", itemName);
                stockLabel.innerHTML = itemStock + " left in stock";

                const priceLabel: HTMLElement = newElement("label", "form-check-label pl-2 cursor-pointer col-3 text-right text-info", divForm);
                priceLabel.setAttribute("for", itemName);
                priceLabel.innerHTML = parseFloat(itemPrice).toFixed(2);

                const euroLabel: HTMLElement = newElement("label", "form-check-label pl-2 cursor-pointer col-1 text-info", divForm);
                euroLabel.setAttribute("for", itemName);
                euroLabel.innerHTML = "€";

            }

        }
    }

    function formChangeHandler(): void {
        renderCart(getFormData());
    }

    function getFormData(): CartItem[] {

        let allArticles: CartItem[] = [];
        let articleCounter: number = 0;

        const categoriesWrapper: HTMLElement = document.getElementById("categories-wrapper");
        const allCategories: HTMLCollection = categoriesWrapper.children;

        for (let i: number = 0; i < allCategories.length; i++) {
            const currentCategory: HTMLElement = <HTMLElement>allCategories[i];

            if (currentCategory.getElementsByTagName("select")[0] != undefined) {    //SELECT
                const selectBox: HTMLSelectElement = <HTMLSelectElement>currentCategory.getElementsByTagName("select")[0];

                for (let k: number = 0; k < selectBox.children.length; k++) {

                    if (selectBox.value == selectBox.children[k].innerHTML) {
                        allArticles[articleCounter] = {
                            name: selectBox.value,
                            price: selectBox.children[k].getAttribute("price")
                        };
                    }
                }
                articleCounter++;
            }

            else {    // CHECKBOX & RADIO
                const allInputs: HTMLCollection = currentCategory.getElementsByTagName("input");
                // console.log(allInputs);

                for (let i: number = 0; i < allInputs.length; i++) {
                    const currentInput: HTMLInputElement = <HTMLInputElement>allInputs[i];
                    const itemName: string = currentInput.nextElementSibling.nextElementSibling.innerHTML;
                    const itemPrice: string = currentInput.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;

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

    function renderCart(_articles: Object): void {

        const cartItemWrapper: HTMLElement = document.getElementById("cart-item-wrapper");
        cartItemWrapper.innerHTML = "";

        let total: number = 0;

        for (let key in _articles) {
            const itemRow: HTMLElement = newElement("div", "item-row row py-1 rounded mb-1", cartItemWrapper);

            const itemNumber: HTMLElement = newElement("div", "col-2", itemRow);
            itemNumber.innerHTML = parseInt(key) + 1;

            const itemName: HTMLElement = newElement("div", "col-6", itemRow);
            itemName.innerHTML = _articles[key].name;

            const itemPrice: HTMLElement = newElement("div", "col-3 text-right", itemRow);
            itemPrice.innerHTML = parseFloat(_articles[key].price).toFixed(2).toString();

            total += parseFloat(_articles[key].price);

            const euro: HTMLElement = newElement("div", "col-1", itemRow);
            euro.innerHTML = "€";
        }

        document.getElementById("cart-total").innerHTML = total.toFixed(2).toString();

        const buyButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buy-button");

        if (cartItemWrapper.innerHTML == "")
            buyButton.disabled = true;
        else
            buyButton.disabled = false;



    }

    function confirmOrder(): void {
        const buyButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buy-button");
        buyButton.disabled = true;
        buyButton.classList.toggle("btn-success");
        buyButton.classList.toggle("btn-secondary");
        buyButton.innerHTML = "Processing ...";

        setTimeout(function (): void {
            checkOrderAndSendData(event);
        }, 300);
    }

    function handleStateChangeOrder(_event: ProgressEvent): void {
        var xhr: XMLHttpRequest = <XMLHttpRequest>_event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("ready: " + xhr.readyState, " | type: " + xhr.responseType, " | status:" + xhr.status, " | text:" + xhr.statusText);
            console.log("response: " + xhr.response);

            const modal: HTMLElement = document.getElementById("modal");
            modal.hidden = false;
        }
    }

    function checkOrderAndSendData(_event: Event): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?newOrder" + generateJSONString(), true);
        xhr.addEventListener("readystatechange", handleStateChangeOrder);
        xhr.send();
    }

    function generateJSONString(): string {
        const allArticles: CartItem[] = getFormData();
        let query: string = JSON.stringify(allArticles);

        return query;
    }

    function closeConfirmation(): void {
        const modal: HTMLElement = document.getElementById("modal");
        modal.hidden = true;

        const buyButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("buy-button");
        buyButton.disabled = false;
        buyButton.classList.toggle("btn-success");
        buyButton.classList.toggle("btn-secondary");
        buyButton.innerHTML = "Buy Now";
    }


}