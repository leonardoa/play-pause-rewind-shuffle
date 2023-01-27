
(function () {

	// variables
	let shuffleButton = document.querySelector("#shuffle");
	let next = document.querySelector("#next");
	let prev = document.querySelector("#prev");
	let list = document.querySelector("#list");
	let rec = document.querySelector("#rec");
	let listItems = document.querySelectorAll(".list-item");
	let li = document.querySelectorAll(".li");

	let numberOfListItems = 74
	let parola = '';

	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	const result = document.getElementById('result');
	let recognition = new SpeechRecognition

	// wait 4 sec before starting recording
	setTimeout(() => {
		startRecognition();
	}, 4000)

	//insert content
	insertContent();

	
	// —————————— functions 

	function insertContent() {
		for (var i = 1; i < numberOfListItems; i++) {

			// create list item
			let node = document.createElement("li");
			node.classList.add("list-item");
			node.id = i;

			let child = document.createElement("div");
			child.classList.add("item");
			child.innerHTML = `<img src='src/img/${i}.jpg' alt='img' />`;

			// fade in img
			setTimeout(() => {
				child.classList.add("show");
			}, 10 * i);

			//append child
			node.appendChild(child);

			// append event to list item
			node.addEventListener("click", (e) => {
				selectItem(e.target)

			})

			//append list item to list into DOM
			list.appendChild(node);
		}
	}
	

	// randomize page order
	function randomItem() {
		for (var i = list.children.length; i >= 0; i--) {
			list.appendChild(list.children[Math.random() * i | 0]);
		}
	}


	//select a page 
	function selectItem(item) {
		if (!item.classList.contains("active")) {
			item.classList.add("active");
		}
		else {
			item.classList.remove("active");
		}
	}


	// voice recognition (dosn't work very well)
	startRecognition = () => {
		let start = true;

		console.log("dentro qui")
		if (SpeechRecognition !== undefined) {

			recognition.onstart = () => {
				console.log("i started listening")			
			};

			recognition.onspeechend = () => {
				console.log("I stopped listening")
				recognition.stop();
				setTimeout(() => {
					recognition.start();
				}, 100)
			};

			recognition.onresult = (result) => {
				parola = result.results[0][0].transcript
				console.log(result.results[0][0].transcript)

				if (parola.includes("innanz") ) {
					console.log("found the condition for the next page")
					nextItem();
				}
				if (parola.includes("André") || parola.includes("andré")) {
					console.log("found the condition for the prev page")
					prevItem();
				}
	

			};

			if (start) {
				console.log("start")
				recognition.start();
				start = false;
			}
			} 
	};

	//speed of next image
	let timer = false;
	let inside = false;



	setInterval(() => {
		console.log(wristSxInside);
		console.log(wristDxInside);

		// if the user face is near the screen go to the single page preview
		if (distanceMapped > 6) {

			let item = document.querySelectorAll('.list-item')[0];
			let active = document.querySelectorAll('.active');
			inside = true;
			// console.log(inside);
			// console.log(distanceMapped);
			if (active.length == 0) {
				selectItem(item)
			}
			// wrist dx inside the camera
			if (wristDxInside == true){
					
					nextItem();
				}
				else {
					wristDxInside = false;
				}
			// wrist sx inside the camera
			if (wristSxInside == true){
				console.log("sinistra")
					prevItem();
				}
			else{
					wristSxInside = false;
				}

		}
		else {
			document.querySelectorAll('li').forEach((item) => {
				/// control the width of the grid with the user's face distance
				item.classList.remove('active')
				item.style.width = `${distanceMapped *20}px`;
				inside = false;
			})

		}
		if (timer) {
			timer = false;
		}
		else {
			timer = true;
		}
	}, 80);


	// next page
	function nextItem() {
			console.log("next page");
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


	// prev page
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
	// —————— end functions


	// variables for shuffle
	let oldX = window.screenX;
	let oldY = window.screenY;
	let setShuffle = false;

	//loop
	//let's wait at least a second before starting the loop
	setTimeout(() => {
		function drawLoop() {
			// console.log("word in the loop: " + parola)
			//if p5 is ready
			if (ready) {
				var interval = setInterval(function () {
					// if the coordinates of the window change, do the shuffle
					if (oldX != window.screenX || oldY != window.screenY) {
						if (!setShuffle) {
							randomItem();
							setShuffle = true;
						}	
						} else {
							setShuffle = false;
						}
					oldX = window.screenX;
					oldY = window.screenY;
				}, 1000);

			}
			requestAnimationFrame(drawLoop);
		}
		requestAnimationFrame(drawLoop);
	}, 1000);


})();