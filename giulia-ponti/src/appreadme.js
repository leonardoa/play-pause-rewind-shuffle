	// vars
	let listItems = document.querySelectorAll(".list-item");
	let numberOfListItems = 506

	//insert content
	insertContent();

	function insertContent() {
		for (var i = 0; i < numberOfListItems; i++) {

			// create list item
			let node = document.createElement("li");
			node.classList.add("list-item");
			node.id = i;

			let child = document.createElement("div");
			child.classList.add("item");
			child.innerHTML = `<img src='src/img/frame_${i}.jpg' alt='img' />`;

			// fade in img
			setTimeout(() => {
				child.classList.add("show");
			}, 100 * i);


			//appena child
			node.appendChild(child);

			//append event to list item
			node.addEventListener("click", (e) => {
				selectItem(e.target)
			})

			//append list item to list into DOM
			list.appendChild(node);
		}
	}