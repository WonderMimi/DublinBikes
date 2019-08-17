$(document).ready(function () {
	var currentImg;
	var nextImg;
	var prevImg;

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

	document.addEventListener("keydown", function (e) {

		if (e.keyCode === 37) {
			currentImg = $(".active");
			prevImg = currentImg.prev();
	
			if (prevImg.length) {
				currentImg.removeClass("active").css("z-index", -10);
				prevImg.addClass("active").css("z-index", 10);
			}

		} else if (e.keyCode === 39) {
			currentImg = $(".active");
			nextImg = currentImg.next();
	
			if (nextImg.length) {
				currentImg.removeClass("active").css("z-index", -10);
				nextImg.addClass("active").css("z-index", 10);
			}
		}
	});
});