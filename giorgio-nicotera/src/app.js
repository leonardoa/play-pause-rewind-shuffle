(function () {

	// vars
	let shuffleButton = document.querySelector("#shuffle");
	let next = document.querySelector("#next");
	let prev = document.querySelector("#prev");
	let list = document.querySelector("#list");
	let listItems = document.querySelectorAll(".list-item");
	let numberOfListItems = 8

	

	

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
	let count = 10;
	//loop
	//let's wait at least a second before starting the loop
	setTimeout(() => {
		function drawLoop() {
			console.log(label)
			console.log(confidence)
			//if p5 is ready
			if (ready) {
				//se dal p5.js viene inviato il messaggio di shuffle
				if (label == "Random" && confidence > 0.99) {
					if (!setShuffle) {
						setShuffle = true;
						console.log((Math.random() - 0.5) * 36)
						// map.setZoom(40);
						map.flyTo({
							center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
							essential: true, // this animation is considered essential with respect to prefers-reduced-motion
							zoom: 10	
						});
					}
				}
				else if (label == 'Zoom' && confidence > 0.9) {
					setShuffle = true;
					map.setZoom(17);
					
					console.log(count)

					//count++
				}
				else if (label == 'Paris' && confidence > 0.9) {
					setShuffle = true;
					map.flyTo({
						center: [2.2945, 48.8584],
						duration: 600,
						essential: true, // this animation is considered essential with respect to prefers-reduced-motion
						zoom: 10,	
					});}
				
				else if (label == 'Cairo' && confidence > 0.9) {
					setShuffle = true;
					map.flyTo({
						center: [31.1342, 29.9792],
						duration: 600,
						essential: true, // this animation is considered essential with respect to prefers-reduced-motion
						zoom: 10,	
					});
				
			}
			
			else if (label == 'Rio de Janeiro' && confidence > 0.9) {
				setShuffle = true;
				map.flyTo({
					center: [-43.21118, -22.951871],
					duration: 600,
					essential: true, // this animation is considered essential with respect to prefers-reduced-motion
					zoom: 10,	
				});
			
		}
		
			
			else {
					setShuffle = false;
				}
			}
			requestAnimationFrame(drawLoop);
		}
		requestAnimationFrame(drawLoop);
	}, 5000);


})();