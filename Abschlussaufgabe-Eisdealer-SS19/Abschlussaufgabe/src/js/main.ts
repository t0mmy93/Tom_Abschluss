namespace eisdealer {
	document.addEventListener("DOMContentLoaded", function (): void {

		let closeModalButtons: HTMLCollection = document.getElementsByClassName("close-modal");
		for (let i: number = 0; i < closeModalButtons.length; i++) {
			closeModalButtons[i].addEventListener("click", closeModal);
		}
	});

	//let address: string = "http://localhost:8100/";
	export let address: string = "https://tomeia2.herokuapp.com/";


	export function newElements(_element: string, _classes: string, _appendTo: HTMLElement): HTMLElement {

		let classArray: string[] = _classes.split(" ");

		switch (_element) {
			case "div":
 
				let div: HTMLDivElement = document.createElement("div");

				for (let i: number = 0; i < classArray.length; i++) {

					if (_classes !== "")
						div.classList.add(classArray[i]);
				}
				if (_appendTo !== null)
					_appendTo.append(div);

				return div;



			case "input":

				let input: HTMLInputElement = document.createElement("input");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						input.classList.add(classArray[i]);
				}
				if (_appendTo !== null)
					_appendTo.append(input);

				return input;



			case "select":

				let select: HTMLSelectElement = document.createElement("select");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						select.classList.add(classArray[i]);
				}

				if (_appendTo !== null)
					_appendTo.append(select);

				return select;



			case "option":

				let option: HTMLOptionElement = document.createElement("option");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						option.classList.add(classArray[i]);
				}

				if (_appendTo !== null)
					_appendTo.append(option);

				return option;



			case "button":

				let button: HTMLButtonElement = document.createElement("button");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						button.classList.add(classArray[i]);
				}

				if (_appendTo !== null)
					_appendTo.append(button);

				return button;

			default:
				let element: HTMLElement = document.createElement(_element);

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						element.classList.add(classArray[i]);
				}

				if (_appendTo !== null)
					_appendTo.append(element);

				return element;
		}

	}


	export function closeModal(): void {
		toggleModal("", "", null, true);

		
		let confirmButton: HTMLElement = document.getElementById("confirm-modal");
		confirmButton.remove();
		let url: string = document.URL;


		if (url.includes("index")) {
			confirmButton = newElements("button", "btn btn-danger", null);
			let divForButton: HTMLElement = document.getElementById("modal-footer");
			divForButton.insertBefore(confirmButton, divForButton.children[0]);
			confirmButton.setAttribute("type", "button");
			confirmButton.setAttribute("id", "confirm-modal");
			confirmButton.innerHTML = "Delete";
		}
		else if (url.includes("orders")) {
			confirmButton = newElements("button", "btn btn-success", null);
			let divForButton: HTMLElement = document.getElementById("modal-footer");
			divForButton.insertBefore(confirmButton, divForButton.children[0]);
			confirmButton.setAttribute("type", "button");
			confirmButton.setAttribute("id", "confirm-modal");
			confirmButton.innerHTML = "Close order";
		}
	}

	export function toggleModal(_typeOfElement: string, _placeholderText: string, _elementToRemove: HTMLElement, _isHidden: boolean): void {
		let modal: HTMLElement = document.getElementById("modal");
		let namePlaceholder: HTMLCollection = document.getElementsByClassName("modal-name-placeholder");
		let typePlaceholder: HTMLCollection = document.getElementsByClassName("modal-type-placeholder");

		for (let i: number = 0; i < namePlaceholder.length; i++) {
			namePlaceholder[i].innerHTML = _placeholderText;
		}
		for (let i: number = 0; i < typePlaceholder.length; i++) {
			typePlaceholder[i].innerHTML = _typeOfElement;
		}

		let confirmButton: HTMLElement = document.getElementById("confirm-modal");

		confirmButton.addEventListener("click", function (event: Event): void {
			closeModal();
			if (document.URL.includes("orders"))
				deleteSingleOrder(_elementToRemove);
			_elementToRemove.remove();

		});

		modal.hidden = _isHidden;
	}
}