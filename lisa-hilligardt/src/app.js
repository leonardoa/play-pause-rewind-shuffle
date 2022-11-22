(function () {



	// vars
	
	let next = document.querySelector("#next");
	let prev = document.querySelector("#prev");
	let list = document.querySelector("#list");
	let listItems = document.querySelectorAll(".list-item");
	let numberOfListItems = 8
	



	listItems.forEach((item)=> {
		item.addEventListener("click", (e) => {
			selectItem(e.target);
		});
	})

	

	//click next button
	next.addEventListener("click", () => {
		nextItem();
	});

	


	function randomItem() {
		for (var i = list.children.length; i >= 0; i--) {
			list.appendChild(list.children[Math.random() * i | 0]);
		}
	}

	function selectItem(item) {
		if (!item.classList.contains("active")) {
			item.classList.add("active");
		}
		else {
			item.classList.remove("active");
		}
	}

	//speed of netxt image
	let timer = false;
	setInterval(() => {
		if(timer){
			timer = false;
		}
		else{
			timer = true;
		}	
	}, 100);

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

	let setShuffle = false;
	//loop
	setTimeout(() => {
		function drawLoop() {
			
			if (ready) {
				
				if (label === " shuffle " && confidence > 0.9) {
					console.log(' shuffle ')
					if (!setShuffle) {
						randomItem();
						console.log(label, setShuffle)
						setShuffle = true;
					}
				}
				else if (label === 'next' && confidence > 0.9) {
					setShuffle = false;
					
					console.log(label)
				}
				else {
					console.log('shuffle')
					setShuffle = false;
				}
			}
			requestAnimationFrame(drawLoop);
		}
		requestAnimationFrame(drawLoop);
	}, 1000);


})();



let setcomplementare = false;
	//loop
	setTimeout(() => {
		function drawLoop() {
			if (ready) {
			
				console.log(label)
				if (label == "complementare" && confidence > 0.9) {
					
					if (!setcomplementare) {
						window.location.reload();
		
						setcomplementare = true;
					}
				}
				
				else {
					
					setcomplementare = false;
					
				}
			}
			requestAnimationFrame(drawLoop);
		}
		requestAnimationFrame(drawLoop);
	}, 1000);



function changetocomplementare(item){
	console.log("in")
	if(label=="complementare"){
		console.log("in complementare")
		windows.location.reload;
	}else{
		console.log("in else")
}
}
	