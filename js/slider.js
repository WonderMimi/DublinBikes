$(document).ready(function () {
	var currentImg;
	var nextImg;
	var prevImg;
	var auto = true; // Auto scroll
	var interval = 5000;
	
	// Listens to mouse click events

	$(".nextBtn").on("click", function () {
		currentImg = $(".active");
		nextImg = currentImg.next();

		if (nextImg.length) {
			currentImg.removeClass("active").css("z-index", -10);
			nextImg.addClass("active").css("z-index", 10);
		}
	});

	$(".prevBtn").on("click", function () {
		currentImg = $(".active");
		prevImg = currentImg.prev();

		if (prevImg.length) {
			currentImg.removeClass("active").css("z-index", -10);
			prevImg.addClass("active").css("z-index", 10);
		}
	});

	// listens to keyboard events
	document.addEventListener("keydown", function (e) {

		if (e.keyCode === 37) {    // left arrow key
			currentImg = $(".active");
			prevImg = currentImg.prev();
	
			if (prevImg.length) {
				currentImg.removeClass("active").css("z-index", -10);
				prevImg.addClass("active").css("z-index", 10);
			}

		} else if (e.keyCode === 39) {    // right arrow key
			currentImg = $(".active");
			nextImg = currentImg.next();
	
			if (nextImg.length) {
				currentImg.removeClass("active").css("z-index", -10);
				nextImg.addClass("active").css("z-index", 10);
			}
		}
	});

	// Auto slide
		if (auto) {
		currentImg = $(".active");
		nextImg = currentImg.next();

		if (nextImg.length) {
			currentImg.removeClass("active").css("z-index", -10);
			nextImg.addClass("active").css("z-index", 10);
		}
		//set interval
	} 

	$("#pause").on("click", () => {
		if (auto === false) {
			auto = true;
			$("#pause").css("text-content","Pause");
		} else {
			auto = false;
			$("#pause").css("text-content","Lecture");
		}
	});
}); 


