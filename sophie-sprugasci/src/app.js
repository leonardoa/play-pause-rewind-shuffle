(function () {
//vars
	let shuffleButton = document.querySelector("#shuffle");
	let list = document.querySelector("#list");
	let listItems = document.querySelectorAll(".list-item");
	let numberOfListItems = 68;
	let containerMouse = document.querySelector("#container-mouse");
	let isNext = false;
	let rectangle = null;
	let ti = null;
	let value = 4910;

//insert content
	setTimeout(() => {
		insertContent();
	}, 500)

	function insertContent() {
		for (var i = 1; i < numberOfListItems; i++) {

			// create list item
			let node = document.createElement("li");
			node.classList.add("list-item");
			node.id = i;

			let child = document.createElement("div");
			child.classList.add("item");
			child.innerHTML = `<img src='src/img/${i}_img.jpg' alt='img' onClick="audio(${i})"/><audio class="tracks" id='audio${i}' controls><source src="src/clip/clip${i}.mp3" type="audio/mpeg"></audio>`;

			// fade in img
			setTimeout(() => {
				child.classList.add("show");
			}, 100 * i);

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

//randomise elements
	function randomItem() {
		for (var i = list.children.length; i >= 0; i--) {
			list.appendChild(list.children[Math.random() * i | 0]);
		}
	}

//audio stop if one starts
	function selectItem(item) {
		if (!item.classList.contains("active")) {
			item.classList.add("active");
			pauseAllAudio();
			playAudio(item.id);	
		}
		else {
			item.classList.remove("active");
			pauseAllAudio();
		}
	}

	function pauseAllAudio() {
		let audios = document.querySelectorAll(".tracks");
		audios.forEach((item) => {
			item.pause();
		})
	}

//click shuffle button
	shuffleButton.addEventListener("click", () => {
		randomItem();
		value = 4539;
	});

//next item
	timer = true;
	function nextItem() {
		console.log("next")
		if (timer) {
			var active = document.querySelector('.active');
			if (active) {
				var next = active.nextElementSibling;
				if (next) {
					active.classList.remove('active');
					next.classList.add('active');
					setTimeout(() => {
						playAudio(next.id);
					}, 100)

				}
				else {
					active.classList.remove('active');
					active = document.querySelector('.list-item');
					active.classList.add('active');
				}
			}
			timer = true;
		}
	}


// audio advance for smoother transitions
	function playAudio(id) {
		rectangle = document.querySelector("#rectangle");
		console.log(value);
		let audio = document.querySelector("#audio" + id);
		audio.play();
		if(!isNext) {
			ti = setTimeout(() => {
				nextItem();
			}, value)
		}
		else {
			clearTimeout(ti);
		}
	}
})();


// img movement
function moveright() {
	rectangle.speedX += 1;
}

//rectangle appears if audio starts 
function selectItem(item) {
	if (!item.classList.contains("active")) {
		item.classList.add("active");
		rectangle.display = true;
	}
	else {
		item.classList.remove("active");
		rectangle.display = false
	}
}
