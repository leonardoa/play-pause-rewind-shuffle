(function () {

	//vars
	let shuffleButton = document.querySelector("#shuffleButton");
	let next = document.querySelector("#next");
	let prev = document.querySelector("#prev");
	let list = document.querySelector("#list");
	let buttonSend = document.querySelector("#buttonSend");
	let listItems = document.querySelectorAll(".list-item");
	let numberOfListItems = 86
	let inputVal

	//insert content
	insertContent();

	function insertContent() {
		for (var i = 0; i < numberOfListItems; i++) {

			//create list item
			let node = document.createElement("li");
			node.classList.add("list-item");
			node.id = i;

			let child = document.createElement("div");
			child.classList.add("item");
			child.innerHTML = `<img src='src/img/${i}.png' alt='img' />`;

			//fade in img
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

	//random item
	function randomItem() {
		for (var i = list.children.length; i >= 0; i--) {
			list.appendChild(list.children[Math.random() * i | 0]);
		}
	}
	
	//add the audio
	var audio = new Audio("src/sound/notification.mp3");

	//select item
	function selectItem(item) {
		
		if (!item.classList.contains("active")) {
			audio.play();
			console.log(audio.play)
			item.classList.add("active");
		}
		else {
			item.classList.remove("active");
		}
	}

	//time between items
	let timer = false;
	setInterval(() => {
		if(timer){
			timer = false;
		}
		else{
			timer = true;
		}	
	}, 3000);

	//next item
	function nextItem() {

		if (timer) {
			var active = document.querySelector('.active');
			

			if (active) {
				var next = active.nextElementSibling;
				if (next) {
					audio.play();
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
	
	//previous item
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

	function getInputValue(){
		//selecting the input element and get its value 
		var inputVal = document.getElementById("myInput").value;
	
	}

	let setShuffle = false;
	//loop
	//let's wait at least a second before starting the loop
	setTimeout(() => {
		function drawLoop() {
			//if p5 is ready
			if (ready) {
				//next item showing the phone
				if (label == 'next' && confidence > 0.9) {
					setShuffle = false;
					nextItem();
				
				}
				
				else {
					setShuffle = false;
				}
			}
			requestAnimationFrame(drawLoop);
			
		}
		requestAnimationFrame(drawLoop);
	}, 1000);

	//shuffle button
	shuffleButton.addEventListener('click',function (){
		randomItem();
	})
	
	//key press enter
	myInput.addEventListener('keypress', function (e) {
		if (e.key === 'Enter') {
		  document.getElementById("buttonSend").onclick();
		  //delete text in the field
		  myInput.value = "";
		}
	});

	//input inside text field
	document.getElementById("buttonSend").onclick = function(){
		let element = document.querySelectorAll('.list-item')[0];
		//setting the input
		if(myInput.value == "cos'hai da dirmi?") {
			console.log(element);
			selectItem(element);
			//delete text in the field
			myInput.value = "";

		}	
		//setting the second input
		else if(myInput.value == "grazie!") {
			
			document.querySelectorAll('.active').forEach((item)=> {
				item.classList.remove("active");
			})
			//delete text in the field
			myInput.value = "";
		}
		
	}

})();

