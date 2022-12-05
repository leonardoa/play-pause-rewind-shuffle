(function () {

	// vars
	let shuffleButton = document.querySelector("#shuffle");
	let next = document.querySelector("#next");
	let prev = document.querySelector("#prev");
	let list = document.querySelector("#list");
	let listItems = document.querySelectorAll(".list-item");


	listItems.forEach((item) => {
		item.addEventListener("click", () => {
			selectItem(item);
		});
	})

	//selectItem shuffle button
	listItems.forEach((item) => {
		item.addEventListener("click", () => {
			selectItem(item);
		});
	})

	//click shuffle button
	shuffleButton.addEventListener("click", () => {
		randomItem();
	});

	//click next button
	next.addEventListener("click", () => {
		nextItem();
	});

	//click prev button
	prev.addEventListener("click", () => {
		prevItem();
	});

	//item select + remove
	function randomItem() {
		for (var i = list.children.length; i >= 0; i--) {
			list.appendChild(list.children[Math.random() * i | 0]);
		}
	}

	function selectItem(item) {
		if (!item.classList.contains("active")) {
			item.classList.add("active");
		}
	}

	function removeActive() {
		let els = document.querySelectorAll('.active');
	}

	//speed of next image
	let timer = false;
	setInterval(() => {
		if (timer) {
			timer = false;
		}
		else {
			timer = true;
		}

		document.querySelectorAll('.active').forEach((el) => {
			el.addEventListener("click", () => {
				document.querySelectorAll('.active').forEach((el) => {
						el.classList.remove("active");
				})
			});
		})

	}, 2000);

	//next
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
					//get first item list-item into the dom
					active.classList.remove('active');
					active = document.querySelector('.list-item');
					active.classList.add('active');
				}
			}
			timer = false;
		}
	}

	//prev
	function prevItem() {
		if (timer) {
			var active = document.querySelector('.active');
			if (active) {
				var prev = active.previousElementSibling;
				if (prev) {
					active.classList.remove('active');
					prev.classList.add('active');
				}
				else {
					//get first item list-item into the dom
					active.classList.remove('active');
					active = document.querySelector('.list-item');
					active.classList.add('active');
				}
			}
			timer = false;
		}
	}

	
	let setShuffle = false;
	
	//loop
	//let's wait at least a second before starting the loop
	setTimeout(() => {
		// function drawLoop() {
		setInterval(() => {
			//if p5 is ready
			if (ready) {
				//se dal p5.js viene inviato il messaggio di shuffle
				if (label == "shuffle" && confidence > 0.98) {
					 if (!setShuffle) {
					 	randomItem();
					 	setShuffle = true;
				 	}
				}
				else if (label == 'next' && confidence > 0.98) {
					 setShuffle = false;
					 nextItem();
				}
				else if (label == 'prev' && confidence > 0.98) {
					 setShuffle = false;
					 prevItem();
				}
				else if ((label == '01' || label == '02' || label == '03' || label == '04' || label == '05' || label == '06' || label == '07' || label == '08' || label == '09' || label == '10') && confidence > 0.98) {
					let el = document.getElementById(label);
					selectItem(el)
					
					document.querySelectorAll('.active').forEach((el) => {
						if (el.id != label) {
							el.classList.remove("active");
						}
					})
				}
				else {
					setShuffle = false;
				}
			}
		}, 100)
	}, 1000);

})();