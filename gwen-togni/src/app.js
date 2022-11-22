(function () {

	// Vars.
	let next = document.querySelector("#next");
	let prev = document.querySelector("#prev");
	let list = document.querySelector("#list");
	let listItems = document.querySelectorAll(".list-item");
	let numberOfListItems = 899

	// Insert content.
	insertContent();

	function insertContent() {
		for (var i = 1; i < numberOfListItems; i++) {

			// Create a list of frames.
			let node = document.createElement("li");
			node.classList.add("list-item");
			node.id = i;

			let child = document.createElement("div");
			child.classList.add("item");
			child.innerHTML = `<img src='src/img/frame_${i}.jpg' alt='img' />`;

			// Fade in to the next frame.
			setTimeout(() => {
				child.classList.add("show");
			}, 10 * i);

			// Add frames.
			node.appendChild(child);

			// Add an event to the list of frames.
			node.addEventListener("click", (e) => {
				selectItem(e.target)
			})

			// Add the list of frames to the list into the DOM.
			list.appendChild(node);
		}
	}

	// Select a frame.
	function selectItem(item) {
		if (!item.classList.contains("active")) {
			item.classList.add("active");
		}
		else {
			item.classList.remove("active");
		}
	}

	// Speed of next image.
	let timer = false;
	setInterval(() => {
		if (timer) {
			timer = false;
		}
		else {
			timer = true;
		}
	}, 10);

	function nextItem() {

		if (timer) {
			var active = document.querySelector('.active');

			if (active) {
				var next = active.nextElementSibling;
				if (next) {
					active.classList.remove('active');
					next.classList.add('active');
				}
				else {
					active.classList.remove('active');
					active = document.querySelector('.list-item');
					active.classList.add('active');
				}
			}
			timer = false;
		}
	}

	// Go back to the previous image.
	function prevItem() {
		var active = document.querySelector('.active');
		if (active) {
			var prev = active.previousElementSibling;
			if (prev) {
				active.classList.remove('active');
				prev.classList.add('active');
			}
		}
	}
	// Selct and animate frames.
	let init = false;
	setTimeout(() => {
		function drawLoop() {

    		// Zoooming in (short distance).
			// If you go closer, you select a frame and you go to the next item.
			if (distance >= 70) {
				if (init == false) {
						// The animation starts from a frame dipending on where you are in the window.
						let itemUno = document.querySelectorAll('.list-item')[0];
						let itemDue = document.querySelectorAll('.list-item')[200]
						let itemTre = document.querySelectorAll('.list-item')[300]
						let itemQuattro = document.querySelectorAll('.list-item')[400]
						let itemCinque = document.querySelectorAll('.list-item')[500]
						let itemSei = document.querySelectorAll('.list-item')[600]
						let itemSette = document.querySelectorAll('.list-item')[700]
						let itemOtto = document.querySelectorAll('.list-item')[800]

						let active = document.querySelector('.active');

						if (!active) {
							init = true;
							console.log(container.scrollTop);

							if (container.scrollTop < 1000) {
								selectItem(itemUno);
							}
							else if (container.scrollTop < 2000) {
								selectItem(itemDue);
							}
							else if (container.scrollTop < 3000) {
								selectItem(itemTre);
							}
							else if (container.scrollTop < 4000) {
								selectItem(itemQuattro);
							}
							else if (container.scrollTop < 5000) {
								selectItem(itemCinque);
							}
							else if (container.scrollTop < 6000){
								selectItem(itemSei);
							}
							else if (container.scrollTop < 7000){
								selectItem(itemSette);
							}
							else {
								selectItem(itemOtto);
							}
						}
				}
				else {
					nextItem();
				}
			}
			// Zooming out (average distance).
			// If you go further away, the frames go back to the previous item.
			else if (distance < 70 && distance >= 50) {
					prevItem();
			}
			// View the global list of all frames (long distance).
			else if (distance < 50) {
				init = false;
				let active = document.querySelector('.active');
				if (active)
					active.classList.remove('active');
			}
			requestAnimationFrame(drawLoop);
		}
		requestAnimationFrame(drawLoop);
	}, 10);
})();