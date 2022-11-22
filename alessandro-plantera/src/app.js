(function () {

	// vars
	let shuffleButton = document.querySelector("#shuffle");
	let next = document.querySelector("#next");
	let prev = document.querySelector("#prev");
	let list = document.querySelector("#list");
	let listItems = document.querySelectorAll(".list-item");
	let numberOfListItems = 294;
	let info = document.querySelector('.titolo')


	//insert content
	insertContent();

	//click shuffle button
	shuffleButton.addEventListener("click", () => {
		randomItem();
	});

	//click next button
	next.addEventListener("click", () => {
		nextItem();
	});

	//click next button
	prev.addEventListener("click", () => {
		prevItem();
	});


	function insertContent() {
		for (var i = 0; i < numberOfListItems; i++) {

			// create list item
			let node = document.createElement("li");
			node.classList.add("list-item");
			node.id = i;

			let child = document.createElement("div");

			child.classList.add("item");
			child.innerHTML = `<img src='src/img/Red/${i}.jpg' alt='img' /><p>${i}</p>`;

			// fade in img
			setTimeout(() => {
				child.classList.add("show");
			}, 10 * i);


			//append child
			node.appendChild(child);

			//append event to list item
			node.addEventListener("click", (e) => {
				selectItem(e.target)
			})

			//append list item to list into DOM
			list.appendChild(node);
		}
	}
	
	//Shuffle array of list
	function randomItem() {
		for (var i = list.children.length; i >= 0; i--) {
			list.appendChild(list.children[Math.random() * i | 0]);
		}
	}

	//On click display the item selected from the list

	function selectItem(item) {
		// let titolo = listItems.getAttribute('id')
		// console.log(titolo)
		console.log(item.id)
		if (!item.classList.contains("active")) {
			item.classList.add("active");
			document.querySelector("#contInfo").style.display = "block"
		}
		else {
			item.classList.remove("active");
			document.querySelector("#contInfo").style.display = "none"
		}
	}
	//On zoom gesture, selected item scale increase and infos disappear

	function zoomItem() {

		try {
			if (!document.querySelector(".active").classList.contains("zoom")) {
				document.querySelector(".active").classList.add("zoom");
				// document.getElementById("contInfo").style.opacity = 0;
			}
			else {
				document.querySelector(".active").classList.remove("zoom");
				// document.getElementById("contInfo").style.opacity = 1;

			}

		} catch (error) {
			return
		}

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
	}, 100);

	// remove and add classes to create a fake images sequencer 
	function nextItem() {
		if (timer) {
			var active = document.querySelector('.active');

			function getRandomInt(min) {
				//animate all the infos shown below the active image
				if (active.id <= 49) {
					return min = 1;
				} else if (active.id >= 50 && active.id <= 99) {
					return min = 2;
				} else if (active.id >= 100 && active.id <= 293) {
					return min = 3;
				}
			}
			if (active) {
				var next = active.nextElementSibling;
				if (next) {
					active.classList.remove('active');
					next.classList.add('active');
					info.innerHTML = `Frame ${active.id} ${getRandomInt(min)}μ/PL ${getRandomInt(min)}x/0.10~`;
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

	//same as below but for reverse
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
	//audio starts and pause on click of the full screen svg 
	var audio = new Audio("src/sound/Unspoken Words (128kbit_AAC).m4a");

	
	//loop
	let setShuffle = false;
	let setZoom = false;
	//let's wait at least a second before starting the loop
	setTimeout(() => {
		function drawLoop() {
			//if p5 is ready
			if (ready) {
				//from p5 reads the label of the teachable machine
				setTimeout(() => {
					setInterval(() => {
						if (label == "Random" && probability > 0.7) {
							if (!setShuffle) {
								randomItem();
							}
							setShuffle = true;
						}
					}, 2000)
				}, 4000)
				if (label == 'Next' && probability >= 0.9) {
					setZoom = false;
					document.getElementById("contInfo").style.opacity = 1;
					nextItem();
				}
				else if (label == 'Pause' && probability >= 0.9) {
				}

				else if (label == 'Zoom' && probability >= 0.9) {
					/* Slowly scale image on 1.2X */
					if (!setZoom) {
						zoomItem();
						document.getElementById("contInfo").style.opacity = 0;
						setZoom = true;
					}
				}
				else if (label == 'Rewind' && probability >= 0.9) {
					prevItem()
				}
				else {
					setShuffle = false;
					if (document.querySelector(".active")) {
						document.querySelector(".active").classList.remove("zoom");
					}

				}
				// console.log(setZoom)
				console.log(label)
			}
			requestAnimationFrame(drawLoop);
		}
		requestAnimationFrame(drawLoop);
	}, 2000);
	
	//full screen 
	function toggleFullscreen(elem) {
		elem = elem || document.documentElement;

		if (!document.fullscreenElement && !document.mozFullScreenElement &&
			!document.webkitFullscreenElement && !document.msFullscreenElement) {
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}

	document.getElementById('togglefullscreen').addEventListener('click', function () {
		toggleFullscreen();
	});

	//go full screen//
	function toggleFullscreen(elem) {
		elem = elem || document.documentElement;
		if (!document.fullscreenElement && !document.mozFullScreenElement &&
			!document.webkitFullscreenElement && !document.msFullscreenElement) {
			if (elem.requestFullscreen) {
				audio.play();
				elem.requestFullscreen();
			} else if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
				audio.pause();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}

	document.getElementById('togglefullscreen').addEventListener('click', function () {
		toggleFullscreen();
	});


})();