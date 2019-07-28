namespace AbschlussaufgabeSS19 {
	document.addEventListener("DOMContentLoaded", function (): void {

		let closeModalButtons: HTMLCollection = document.getElementsByClassName("close-modal");
		for (let i: number = 0; i < closeModalButtons.length; i++) {
			closeModalButtons[i].addEventListener("click", closeModal);
		}
	});


	export let address: string = "https://tomeia2.herokuapp.com/";
	

	export function createNewElement(_element: string, _classes: string, _appendTo: HTMLElement): HTMLElement {

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
			confirmButton = createNewElement("button", "btn btn-danger", null);
			let divButton: HTMLElement = document.getElementById("modal-footer");
			divButton.insertBefore(confirmButton, divButton.children[0]);
			confirmButton.setAttribute("type", "button");
			confirmButton.setAttribute("id", "confirm-modal");
			confirmButton.innerHTML = "Delete";
		}
		else if (url.includes("orders")) {
			confirmButton = createNewElement("button", "btn btn-success", null);
			let divButton: HTMLElement = document.getElementById("modal-footer");
			divButton.insertBefore(confirmButton, divButton.children[0]);
			confirmButton.setAttribute("type", "button");
			confirmButton.setAttribute("id", "confirm-modal");
			confirmButton.innerHTML = "Close order";
		}
	}

	export function toggleModal(typeOfElement: string, placeholderText: string, elementToRemove: HTMLElement, isHidden: boolean): void {
		let modal: HTMLElement = document.getElementById("modal");
		let namePlatzhalter: HTMLCollection = document.getElementsByClassName("modal-name-placeholder");
		let typePlaceholders: HTMLCollection = document.getElementsByClassName("modal-type-placeholder");

		for (let i: number = 0; i < namePlatzhalter.length; i++) {
			namePlatzhalter[i].innerHTML = placeholderText;
		}
		for (let i: number = 0; i < typePlaceholders.length; i++) {
			typePlaceholders[i].innerHTML = typeOfElement;
		}

		let confirmButton: HTMLElement = document.getElementById("confirm-modal");

		confirmButton.addEventListener("click", function (event: Event): void {
			closeModal();
			if (document.URL.includes("orders"))
				deleteSingleOrder(elementToRemove);
			elementToRemove.remove();

		});

		modal.hidden = isHidden;
	}
}