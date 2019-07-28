var AbschlussaufgabeSS19;
(function (AbschlussaufgabeSS19) {
    document.addEventListener("DOMContentLoaded", function () {
        let closeModalButtons = document.getElementsByClassName("close-modal");
        for (let i = 0; i < closeModalButtons.length; i++) {
            closeModalButtons[i].addEventListener("click", closeModal);
        }
    });
    AbschlussaufgabeSS19.address = "https://tomeia2.herokuapp.com/";
    function createNewElement(_element, _classes, _appendTo) {
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
    AbschlussaufgabeSS19.createNewElement = createNewElement;
    // bootstrap funktionen
    function closeModal() {
        toggleModal("", "", null, true);
        let confirmButton = document.getElementById("confirm-modal");
        confirmButton.remove();
        let url = document.URL;
        if (url.includes("index")) {
            confirmButton = createNewElement("button", "btn btn-danger", null);
            let divButton = document.getElementById("modal-footer");
            divButton.insertBefore(confirmButton, divButton.children[0]);
            confirmButton.setAttribute("type", "button");
            confirmButton.setAttribute("id", "confirm-modal");
            confirmButton.innerHTML = "Delete";
        }
        else if (url.includes("orders")) {
            confirmButton = createNewElement("button", "btn btn-success", null);
            let divButton = document.getElementById("modal-footer");
            divButton.insertBefore(confirmButton, divButton.children[0]);
            confirmButton.setAttribute("type", "button");
            confirmButton.setAttribute("id", "confirm-modal");
            confirmButton.innerHTML = "Close order";
        }
    }
    AbschlussaufgabeSS19.closeModal = closeModal;
    function toggleModal(typeOfElement, placeholderText, elementToRemove, isHidden) {
        let modal = document.getElementById("modal");
        let namePlatzhalter = document.getElementsByClassName("modal-name-placeholder");
        let typePlaceholders = document.getElementsByClassName("modal-type-placeholder");
        for (let i = 0; i < namePlatzhalter.length; i++) {
            namePlatzhalter[i].innerHTML = placeholderText;
        }
        for (let i = 0; i < typePlaceholders.length; i++) {
            typePlaceholders[i].innerHTML = typeOfElement;
        }
        let confirmButton = document.getElementById("confirm-modal");
        confirmButton.addEventListener("click", function (event) {
            closeModal();
            if (document.URL.includes("orders"))
                AbschlussaufgabeSS19.deleteSingleOrder(elementToRemove);
            elementToRemove.remove();
        });
        modal.hidden = isHidden;
    }
    AbschlussaufgabeSS19.toggleModal = toggleModal;
})(AbschlussaufgabeSS19 || (AbschlussaufgabeSS19 = {}));
//# sourceMappingURL=main.js.map