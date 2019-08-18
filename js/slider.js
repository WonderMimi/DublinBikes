$(document).ready(function () {
	var currentImg;
	var nextImg;
	var prevImg;
/* 	var slides = document.querySelectorAll(".fade");
	var auto = true; // Auto scroll
	var intervalTime = 5000;
	let slideInterval;
	
	const nextSlide = () => {
	  // Get "active" class
	  currentImg = document.querySelector(".active");
	  // Remove "active" class
	  currentImg.classList.remove("active");
	  // Check for next slide
	  if (currentImg.nextElementSibling) {
		// Add "active" to next sibling
		currentImg.nextElementSibling.classList.add("active");
	  } else {
		// Add "active" to start
		slides[0].classList.add("active");
	  }
	  setTimeout(() => currentImg.classList.remove("active"));
	};
	
	const prevSlide = () => {
	  // Get "active" class
	  currentImg = document.querySelector(".active");
	  // Remove "active" class
	  currentImg.classList.remove("active");
	  // Check for prev slide
	  if (currentImg.previousElementSibling) {
		// Add "active" to prev sibling
		currentImg.previousElementSibling.classList.add("active");
	  } else {
		// Add "active" to last
		slides[slides.length - 1].classList.add("active");
	  }
	  setTimeout(() => currentImg.classList.remove("active"));
	}; */
	
	// Listens to mouse click events
/* 	document.getElementById("nextBtn").addEventListener("click", e => {
	  nextSlide();
	  if (auto) { // Resets the interval to 5s even when arrow is clicked
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	  }
	});
	
	document.getElementById("prevBtn").addEventListener("click", e => {
	  prevSlide();
	  if (auto) {  // Resets the interval to 5s even when arrow is clicked
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	  }
	}); */
	
/* 	// Auto slide
	if (auto) {
	  // Run next slide at interval time
	  slideInterval = setInterval(nextSlide, intervalTime);
	} */

/* 	$("#pause").on("click", () => {
		if (auto === false) {
			auto = true;
			nextSlide();
			$("#pause").css("text-content","Pause");
		} else {
			auto = false;
			$("#pause").css("text-content","Lecture");
		}
	}); */

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
});