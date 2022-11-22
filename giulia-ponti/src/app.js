(function () {

	// vars
	let next = document.querySelector("#next");
	let prev = document.querySelector("#prev");
	let list = document.querySelector("#list");
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

	//select frame
	function selectItem(item) {
		if (!item.classList.contains("active")) {
			item.classList.add("active");
			
		}
		else {
			item.classList.remove("active");
		}
	}

	//speed of next image
	let timer = false;
	setInterval(() => {
		if(timer){
			timer = false;
		}
		else{
			timer = true;
		}	
	}, 5);

	//see next frame
	function nextItem() {

		if (timer) {
			var active = document.querySelector('.active');

			if (active) {
				//active next frame
				var next = active.nextElementSibling;
				if (next) {
					active.classList.remove('active');
					next.classList.add('active');
					sound.play();
					
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

	//see previous frame
	function prevItem() {
		var active = document.querySelector('.active');
		if (active) {
			sound.play();
			//active previous frame
			var prev = active.previousElementSibling;
			if (prev) {
				active.classList.remove('active');
				prev.classList.add('active');
			}
		}
	}
	

	let setShuffle = false;
	let init = false;
	//loop
	//let's wait at least a second before starting the loop
	setTimeout(() => {
		function drawLoop() {
			//if p5 is ready
			 if (ready) {
				//if distance is between 40 and 100 see next frame and nothing is selected start from first frame
				var active = document.querySelector('.active')
				if (distance > 40 && distance < 100 && !active){
					let init = true;
					let item = document.querySelectorAll('.list-item')[0];
					item.classList.add('active');
					nextItem();
					setShuffle = false;
				}

				//if distance is less than 100 see next frame
				else if (distance > 40 && distance < 100) {
					setShuffle = false;
					nextItem();
				}
				
				//if distance is less than 20 see previous frame
				else if (distance < 20 ) {
					let init = true;
					setShuffle = false;
					prevItem();
					console.log(distance)
				}

				//if distance is different from the previous, nothing happen = stop on the frame
				else {
					setShuffle = false;
					sound.pause();
				}
			}
			
			requestAnimationFrame(drawLoop);
		}
		requestAnimationFrame(drawLoop);
	}, 1000);
})();


//resize
let windowWidth = window.innerWidth;
let timeout = null;

window.addEventListener('resize', resizeFn, true);

let setShuffle = false;

//random frame order
function randomItem() {
	for (var i = list.children.length; i >= 0; i--) {
		list.appendChild(list.children[Math.random() * i | 0]);
	}
}

//organize frame in order by id 
function sortChildrenDivsById(parentId) {
    var parent = document.getElementById(parentId);
	var children = parent.getElementsByTagName('li');
    var ids = [], i, len;
    for (i = 0, len = children.length; i < len; i++) {
        ids.push(parseInt(children[i].id.replace(/^.*_/g, ""), 10));
    }
    ids.sort(function(a, b) {return(a - b);});
     for (i = 0, len = ids.length; i < len; i++) {
         parent.appendChild(document.getElementById(ids[i]));
     }
}

//resize window
function resizeFn(event) {
	clearTimeout(timeout);
	document.querySelector("#container").style.display = 'none';
	timeout = setTimeout(() => {
		document.querySelector("#container").style.display = 'block';
		windowWidth = window.innerWidth;
		//if window size is higher than 950, organize frame in order by id
		if (windowWidth > 950 ) {
			sortChildrenDivsById("list");;
			setShuffle = false;
		}
		//if window size is less than 900, random frame order
		else {
			randomItem();
			setShuffle = true;

			}
	}, 10)
}

