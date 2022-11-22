(function () {

	// Variables
	let numberOfPoemStanzas = 12
	let setShuffle = false;
	let poem = document.querySelector("#poem");

	// Insert content
	insertContent();

	function insertContent() {
		for (var i = 0; i < numberOfPoemStanzas; i++) {

			// Create poem stanzas
			let node = document.createElement("li");
			node.classList.add("poem-stanzas");
			node.id = i;

			let child = document.createElement("div");
			child.classList.add("poem");
		}}

		function randomItem() {
			for (var i = poem.children.length; i >= 0; i--) {
				poem.appendChild(poem.children[Math.random() * i | 0]);
			}
		}

	// Activate Shuffle event
	let timer = false;
	setInterval(() => {
		if (timer) {
			timer = false;
		} else {
			timer = true;
		}
	}, 100);

	function shuffleItem() {
		if (timer) {
			var active = document.querySelector('.active');

			if (active) {
				var shuffle = active.shuffleElementSibling;
				if (shuffle) {
					active.classList.remove('active');
					shuffle.classList.add('active');
				} 
			} 
			timer = false;
		}
	}

	// Let's wait at least a second before starting the loop
	setTimeout(() => {
		function drawLoop() {
			// If p5 is ready
			if (ready) {
				// If the shuffle message is sent from p5.js
				if (label == "shuffle" && confidence > 0.6) {
					if (!setShuffle) {
						randomItem();
						setShuffle = true;
					}
				} else if (label == 'me' && confidence > 0.99) {
					setShuffle = false;
					shuffleItem();
				} else {
					setShuffle = false;
				}
			}
			requestAnimationFrame(drawLoop);
		}
		requestAnimationFrame(drawLoop);
	}, 1000);

// Reload window page whit the page resizing
	window.addEventListener('resize', resizeFn);
	let tm;

	function resizeFn(event) {
		clearTimeout(tm);
		tm = setTimeout(() => {
			window.location.reload();
		}, 10)
	}

})();