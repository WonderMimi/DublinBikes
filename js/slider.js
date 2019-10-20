function Slider() {
	let	auto = true;
	let	interval = 5000;	// 5 secs interval between two slides
	let delay;

	const start = function() {
		auto = true;
		$('#pause').text('Pause');
		delay = setInterval(nextSlide, interval); // will execute nextSlide function every 5s
	}
	
	setTimeout(start,2000);    // will start auto slider after 2 secondes

	const nextSlide = function() {
		currentImg = $(".active");
        nextImg = currentImg.next();
 
        if (nextImg.length) {
            currentImg.removeClass("active").css("z-index", -10);
            nextImg.addClass("active").css("z-index", 10);
     	}
	};

	const prevSlide = function() {
		currentImg = $(".active");
        prevImg = currentImg.prev();
 
        if (prevImg.length) {
            currentImg.removeClass("active").css("z-index", -10);
            prevImg.addClass("active").css("z-index", 10);
        }
	};
	
	const pause = function() {
		auto = false;
		$('#pause').text('Lecture');
		clearInterval(delay);		
	};

	const togglePausePlay = function() {
		if (auto){
			pause();
		 } else {
			start();
		};
	};
			
	this.init = function() {    
		// Mouse events
		$('.nextBtn').on('click', function() {
			nextSlide();
		})

		$(".prevBtn").on('click', function () {
			prevSlide();
		})

		$('#pause').on('click', function () {
			togglePausePlay();
		})

		//keyboard events
		$(document).keydown(function (e)  {	
			switch(e.keyCode) {
				case 37:           // left arrow
					prevSlide()
					break;
				case 39:           // right arrow
					nextSlide()
					break;
				case 32:			// spacebar
					e.preventDefault()
					togglePausePlay()
					break;
				default:
					break			
			}
		})
	}
};

const slider = new Slider();
slider.init();

