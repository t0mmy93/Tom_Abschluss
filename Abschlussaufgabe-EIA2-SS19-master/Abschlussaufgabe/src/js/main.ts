namespace AbschlussaufgabeSS19 {
	document.addEventListener("DOMContentLoaded", function (): void {

		const closeModalButtons: HTMLCollection = document.getElementsByClassName("close-modal");
		for (let i: number = 0; i < closeModalButtons.length; i++) {
			closeModalButtons[i].addEventListener("click", closeModal);
		}
	});


	export let address: string = "https://tomeia2.herokuapp.com/";
	//let address: string = "http://localhost:8100/";

	export function newElement(_element: string, _classes: string, _appendTo: HTMLElement): HTMLElement {

		const classArray: string[] = _classes.split(" ");

		switch (_element) {
			case "div":
 
				const div: HTMLDivElement = document.createElement("div");

				for (let i: number = 0; i < classArray.length; i++) {

					if (_classes !== "")
						div.classList.add(classArray[i]);
				}
				if (_appendTo !== null)
					_appendTo.append(div);

				return div;



			case "input":

				const input: HTMLInputElement = document.createElement("input");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						input.classList.add(classArray[i]);
				}
				if (_appendTo !== null)
					_appendTo.append(input);

				return input;



			case "select":

				const select: HTMLSelectElement = document.createElement("select");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						select.classList.add(classArray[i]);
				}

				if (_appendTo !== null)
					_appendTo.append(select);

				return select;



			case "option":

				const option: HTMLOptionElement = document.createElement("option");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						option.classList.add(classArray[i]);
				}

				if (_appendTo !== null)
					_appendTo.append(option);

				return option;



			case "button":

				const button: HTMLButtonElement = document.createElement("button");

				for (let i: number = 0; i < classArray.length; i++) {
					if (_classes !== "")
						button.classList.add(classArray[i]);
				}

				if (_appendTo !== null)
					_appendTo.append(button);

				return button;

			default:
				const element: HTMLElement = document.createElement(_element);

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

		// TS-Lint is not allowing access to arguments.callee, therefore we reinitialize the button
		let confirmButton: HTMLElement = document.getElementById("confirm-modal");
		confirmButton.remove();
		let url: string = document.URL;


		if (url.includes("index")) {
			confirmButton = newElement("button", "btn btn-danger", null);
			const divForButton: HTMLElement = document.getElementById("modal-footer");
			divForButton.insertBefore(confirmButton, divForButton.children[0]);
			confirmButton.setAttribute("type", "button");
			confirmButton.setAttribute("id", "confirm-modal");
			confirmButton.innerHTML = "Delete";
		}
		else if (url.includes("orders")) {
			confirmButton = newElement("button", "btn btn-success", null);
			const divForButton: HTMLElement = document.getElementById("modal-footer");
			divForButton.insertBefore(confirmButton, divForButton.children[0]);
			confirmButton.setAttribute("type", "button");
			confirmButton.setAttribute("id", "confirm-modal");
			confirmButton.innerHTML = "Close order";
		}
	}

	export function toggleModal(typeOfElement: string, placeholderText: string, elementToRemove: HTMLElement, isHidden: boolean): void {
		const modal: HTMLElement = document.getElementById("modal");
		const namePlaceholders: HTMLCollection = document.getElementsByClassName("modal-name-placeholder");
		const typePlaceholders: HTMLCollection = document.getElementsByClassName("modal-type-placeholder");

		for (let i: number = 0; i < namePlaceholders.length; i++) {
			namePlaceholders[i].innerHTML = placeholderText;
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