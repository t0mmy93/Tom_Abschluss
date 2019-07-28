var eisdealer;
(function (eisdealer) {
    document.addEventListener("DOMContentLoaded", function () {
        let closeModalButtons = document.getElementsByClassName("close-modal");
        for (let i = 0; i < closeModalButtons.length; i++) {
            closeModalButtons[i].addEventListener("click", closeModal);
        }
    });
    //let address: string = "http://localhost:8100/";
    eisdealer.address = "https://tomeia2.herokuapp.com/";
    function newElements(_element, _classes, _appendTo) {
        let classArray = _classes.split(" ");
        switch (_element) {
            case "div":
                let div = document.createElement("div");
                for (let i = 0; i < classArray.length; i++) {
                    if (_classes !== "")
                        div.classList.add(classArray[i]);
                }
                if (_appendTo !== null)
                    _appendTo.append(div);
                return div;
            case "input":
                let input = document.createElement("input");
                for (let i = 0; i < classArray.length; i++) {
                    if (_classes !== "")
                        input.classList.add(classArray[i]);
                }
                if (_appendTo !== null)
                    _appendTo.append(input);
                return input;
            case "select":
                let select = document.createElement("select");
                for (let i = 0; i < classArray.length; i++) {
                    if (_classes !== "")
                        select.classList.add(classArray[i]);
                }
                if (_appendTo !== null)
                    _appendTo.append(select);
                return select;
            case "option":
                let option = document.createElement("option");
                for (let i = 0; i < classArray.length; i++) {
                    if (_classes !== "")
                        option.classList.add(classArray[i]);
                }
                if (_appendTo !== null)
                    _appendTo.append(option);
                return option;
            case "button":
                let button = document.createElement("button");
                for (let i = 0; i < classArray.length; i++) {
                    if (_classes !== "")
                        button.classList.add(classArray[i]);
                }
                if (_appendTo !== null)
                    _appendTo.append(button);
                return button;
            default:
                let element = document.createElement(_element);
                for (let i = 0; i < classArray.length; i++) {
                    if (_classes !== "")
                        element.classList.add(classArray[i]);
                }
                if (_appendTo !== null)
                    _appendTo.append(element);
                return element;
        }
    }
    eisdealer.newElements = newElements;
    function closeModal() {
        toggleModal("", "", null, true);
        let confirmButton = document.getElementById("confirm-modal");
        confirmButton.remove();
        let url = document.URL;
        if (url.includes("index")) {
            confirmButton = newElements("button", "btn btn-danger", null);
            let divForButton = document.getElementById("modal-footer");
            divForButton.insertBefore(confirmButton, divForButton.children[0]);
            confirmButton.setAttribute("type", "button");
            confirmButton.setAttribute("id", "confirm-modal");
            confirmButton.innerHTML = "Delete";
        }
        else if (url.includes("orders")) {
            confirmButton = newElements("button", "btn btn-success", null);
            let divForButton = document.getElementById("modal-footer");
            divForButton.insertBefore(confirmButton, divForButton.children[0]);
            confirmButton.setAttribute("type", "button");
            confirmButton.setAttribute("id", "confirm-modal");
            confirmButton.innerHTML = "Close order";
        }
    }
    eisdealer.closeModal = closeModal;
    function toggleModal(_typeOfElement, _placeholderText, _elementToRemove, _isHidden) {
        let modal = document.getElementById("modal");
        let namePlaceholder = document.getElementsByClassName("modal-name-placeholder");
        let typePlaceholder = document.getElementsByClassName("modal-type-placeholder");
        for (let i = 0; i < namePlaceholder.length; i++) {
            namePlaceholder[i].innerHTML = _placeholderText;
        }
        for (let i = 0; i < typePlaceholder.length; i++) {
            typePlaceholder[i].innerHTML = _typeOfElement;
        }
        let confirmButton = document.getElementById("confirm-modal");
        confirmButton.addEventListener("click", function (event) {
            closeModal();
            if (document.URL.includes("orders"))
                eisdealer.deleteSingleOrder(_elementToRemove);
            _elementToRemove.remove();
        });
        modal.hidden = _isHidden;
    }
    eisdealer.toggleModal = toggleModal;
})(eisdealer || (eisdealer = {}));
//# sourceMappingURL=main.js.map