/*   ===================================       TIMER        ==================================
class Timer {
    constructor(_timerElt, _timeTimer) {
        this.timerElt = _timerElt;
        this.timeTimer = _timeTimer;
        this.min = (timeTimer - 60) / 60;
        this.sec = 59;
        this.minutes = this.min + '0';
        this.secondes = this.sec + '0';
        this.signbtn = document.querySelector('#sign');
        this.startTimer()
    }
    displayTimer() {
        const timer = setInterval(() => {

                document.querySelector('timer').innerHTML = 'Bonjour ' + localStorage.getItem('nom') + ' ' + localStorage.getItem('prenom') + '' + " il vous reste : " + sessionStorage.getItem('minutes') + " mn " + sessionStorage.getItem('secondes') + " s " + "pour rÃ©cupÃ©rer votre vÃ©lo rÃ©servÃ© Ã  la station " + sessionStorage.getItem('nomStation');
                document.querySelector('book').innerHTML = '';
                this.timeTimer--;
                let timeElt = document.querySelector('timer');

                if ((this.sec >= 0)) {
                    this.sec--;
                }

                if (this.sec === 0) {
                    this.sec = 59;
                    this.min--;
                }

                if ((this.min >= 0) && (this.sec >= 0)) {
                    sessionStorage.setItem('secondes', this.sec);
                    sessionStorage.setItem('minutes', this.min);
                    sessionStorage.setItem('temps', this.timeTimer);
                } else {
                    clearInterval(timer);
                    timeElt.innerHTML = "Temps expiré. Merci d'effectuer une nouvelle réservation";
                }
            },
            1000)
    }

    startTimer() {
        this.btnValidSign.addEventListener('click', () => {
            this.displayTimer();
            document.querySelector('.reservation').style.visibility = 'hidden';
            document.querySelector('.valid').style.visibility = 'hidden';
        })
    }
}
const countDown = new Timer(document.querySelector('.my_timer'), 1200);
*/

/*   ===================================       CANVAS        ==================================

// canvas creation
/*var canvas  = document.querySelector('#canvas');
var context = canvas.getContext('2d'); //pour accéder au contexte de rendu

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

document.addEventListener("load", createCanvas());

function createCanvas() {
             
   canvas.mousedown(function(e) {
        // Mouse down location
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        
        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
    });
    
    canvas.mousemove(function(e){
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });
    
    canvas.mouseup(function(e){
        paint = false;
            redraw();
    });
    
    canvas.mouseleave(function(e) {
        paint = false;
    });
    
    $('#clear').mousedown(function(e) {
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        clearCanvas(); 
    }); 
}
    
function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function clearCanvas() {
	context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redraw(){
    clearCanvas(); 
    
    context.strokeStyle = "#333";
    context.lineJoin = "round";
    context.lineWidth = 5;
              
    for(var i=0; i < clickX.length; i++) {		
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.stroke();
    }
  }
*/

/*
context.fillStyle = "pink";
context.fillRect(50, 10, 250, 180);  // (x, y, largeur, hauteur)
*/

/*
function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      context = canvas.getContext('2d');
      context.fillStyle = 'rgb(200, 0, 0)';
      context.fillRect(10, 10, 50, 50);

      context.fillStyle = 'rgba(0, 0, 200, 0.5)';
      context.fillRect(30, 30, 50, 50);

      context.fillRect(90, 25, 100, 100); // dessine un carré
      context.clearRect(110, 45, 60, 60); // efface un carré plus petit
      context.strokeRect(115, 50, 50, 50); // trace le contour d'un carré encore plus petit
      

    // Triangle plein
    context.beginPath();
    context.moveTo(25, 25);
    context.lineTo(105, 25);
    context.lineTo(25, 105);
    context.fill();

    // Triangle filaire
    context.beginPath();
    context.moveTo(125, 125);
    context.lineTo(125, 45);
    context.lineTo(45, 125);
    context.closePath();
    context.stroke();
   }; 
  }*/
/*
  class Sign {
    constructor() {
        // Variables :
        this.color = "#000";
        this.painting = false;
        this.started = false;
        this.width_brush = 1;
        this.canvas = $("#sign");
        this.cursorX, this.cursorY;
        this.context = this.canvas[0].getContext('2d');
        // Trait arrondi :
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        this.mousedown();
        this.mouseup();
        this.mousemove();
        this.drawLine();
    }
    mousedown() {
        // Click souris enfoncé sur le canvas, je dessine :
        $(this.canvas).mousedown(function (e) {
            this.painting = true;

            // Coordonnées de la souris :
            this.cursorX = (e.pageX - this.offsetLeft);
            this.cursorY = (e.pageY - this.offsetTop);

        });

    }

    mouseup() {
        // Relachement du Click sur tout le document, j'arrête de dessiner :
        $(this.canvas).mouseup(function () {
            this.painting = false;
            this.started = false;
        });
    }

    mousemove() {
        // Mouvement de la souris sur le canvas :
        $(this.canvas).mousemove(function (e) {
            // Si je suis en train de dessiner (click souris enfoncé) :
            if (this.painting) {
                // Set Coordonnées de la souris :
                this.cursorX = (e.pageX - this.offsetLeft) - 2; // 10 = décalage du curseur
                this.cursorY = (e.pageY - this.offsetTop) - 2;
                this.drawLine()
            }
        });
    }
    // Fonction qui dessine une ligne :
    drawLine() {
        // Si c'est le début, j'initialise
        if (!this.started) {
            // Je place mon curseur pour la première fois :
            this.context.beginPath();
            this.context.moveTo(this.cursorX, this.cursorY);
            this.started = true;
        }
        // Sinon je dessine
        else {
            this.context.lineTo(this.cursorX, this.cursorY);
            this.context.strokeStyle = this.color;
            this.context.lineWidth = this.width_brush;
            this.context.stroke();
        }

    }
}
*/
/*
class Canvas {
    constructor() {
        this.canvasElt = document.querySelector("#canvas);
        this.context = this.canvasElt.getContext("2d");
        this.sign = false;
        this.clearbtn = document.querySelector("#canvas_clear");
        this.validatebtn = document.querySelector("#canvas_submit");
        this.cancelbtn = document.querySelector("#canvas_cancel");
    }

    // this.signature();

    getMousePosition(position) {  //  pour récupérer la position de la souris
        let rec = this.canvasElt.getBoundingClientRect();
        return {
            x: position.clientX - rec.left,
            y: position.clientY - rec.top
        }
    }

    signature() {
        this.canvasElt.addEventListener("mousedown", (e) => {  // Ecoute le début de la signature
            this.sign = true;
            let mousePosition = this.getMousePosition(e);
            this.context.beginPath();
            this.context.moveTo(mousePosition.x, mousePosition.y);
        })

        this.canvasElt.addEventListener("mouseup", () => {   //Ecoute la fin de la signature
            this.sign = false;
        })

        this.canvasElt.addEventListener("mousemove", (e) => {
            if (this.sign) {
                let mousePosition = this.getMousePosition(e);
                this.context.lineTo(mousePosition.x, mousePosition.y);
                this.context.stroke();
                document.querySelector("canvas_submit").style.visibility = "initial";
            };
        })

        this.canvasElt.addEventListener("mouseleave", () => {
            this.sign = false;
        })

        this.clearbtn.addEventListener("click", () => {
            this.context.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height);
            document.querySelector("canvas_submit").style.visibility = "hidden";
        });

        this.validatebtn.addEventListener('click', () => {
            document.querySelector('timer').style.visibility = 'initial';
        })
        
    }
}
const signature = new Canvas();
*/

/*  Codepen : https://codepen.io/Nico33/pen/zXREax
const canvas = document.getElementById(`monCanvas`);
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let count = 0;
let dessin = false; // Fonction dessin
const bouton = document.getElementById(`monBouton`)
const contexte = canvas.getContext(`2d`);

canvas.addEventListener(`mousedown`, function (e) {
  dessin = true; // Dessine
  contexte.stokeStyle = `black`;
  contexte.lineWidth = 3;
  contexte.beginPath(); // Début du tacé
  contexte.moveTo(e.offsetX, e.offsetY); // Initialise le tracé
});

canvas.addEventListener(`mousemove`, function (e) {
  if (dessin==true) {
    contexte.lineTo(e.offsetX + 0.01, e.offsetY + 0.01); // Je tire un trait vers ces nouvelles coordonnées
    contexte.stroke(); // Effectue le tracer
  }
  count++;
});

canvas.addEventListener(`mouseup`, function (e) {
  dessin = false; // Stop le tracé
});

canvas.addEventListener(`touchstart`, function (e) {
  dessin = true; // Dessine
  contexte.stokeStyle = `black`;
  contexte.lineWidth = 3;
  contexte.beginPath(); // Début du tacé
  contexte.moveTo(e.offsetX, e.offsetY); // Initialise le tracé
});

// Tracé
canvas.addEventListener(`touchmove`, function (e) {
  if (dessin==true) {
    contexte.lineTo(e.offsetX + 0.01, e.offsetY + 0.01); // Je tire un trait vers ces nouvelles coordonnées
    contexte.stroke(); // Effectue le tracer
  }
  count++;
});

canvas.addEventListener(`touchend`, function (e) {
  dessin = false; // Stop le tracé
});


bouton.addEventListener(`click`, function (e) { // Null ?
  if (count > 10) {
    alert(`Signature enregistrée`);
  } else {
    alert(`Veuillez resigner s'il vous plait`);
  }
});
*/

/*  Codepen https://codepen.io/anon/pen/RyvYpJ
var effacerButton=document.getElementById('effacer');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 220;
canvas.height = 200;
//conditionne la signature dans le context false, reservation bloqué true reservation possible
var validCanvas = false;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 2;
ctx.strokeStyle = "#000000";

var isDrawing = false;
var lastX = 0;
var lastY = 0;

function draw(e) {
    // Si isDrawing est false
    if(!isDrawing) return;
    //listen for mouse move event
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

//fonction effacer Canvas
function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  validCanvas = false;
}
//Evenements Souris
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    validCanvas=true
  });
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);
  
//Evenements Tactiles
  canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    validCanvas=true
  });
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', () => isDrawing = false);
  canvas.addEventListener('touchcancel', () => isDrawing = false);
  	
// Bloque le scroll sur le Canvas
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
//Event bouton effacer canvas  
effacerButton.addEventListener('click',clearCanvas);

*/
/* capturing canvas image

let dataURL = canvas.toDataURL();
console.log(dataURL);

OU

canvas.toBlob(function(blob) {
  var newImg = document.createElement('img'),
      url = URL.createObjectURL(blob);

  newImg.onload = function() {
    // no longer need to read the blob so it's revoked
    URL.revokeObjectURL(url);
  };

  newImg.src = url;
  document.body.appendChild(newImg);
});
*/




/*   ===================================       SLIDER        ==================================

/*
class Slider {
  constructor (element, options = {}){    // element refers to div .slides and options represents slider settings
      this.element =  element,
      this.options = options
  }
next(){}
prev() {}
}
*/

/*
var i = 0;  // start point
var images = [];
var time = 5000;  // time in millisecondes between each image

// image list
images[0] = "img/orendre.jpg";
images[1] = "rendre.png";
images[2] = "prendre.jpg";
images[3] = "rendre.png";

// change image function

function changeImg() {
    document.slide.src = images[i];
    
    if (i < images.length -1) {
        i++;
    } else {
        i = 0;
    };

    setTimeout("changeImg", time);
}

window.onload = changeImg;
*/
/*
//Waiting for the page to be completely loaded
document.addEventListener("load", function() {
  new Slider(document.getElementsByClassName("slides"), {
  slidesToScroll: 2,
  slidesVisible: 2
});
})
*/

/* var slide = function() {

	var paused = false

	$('.nextBtn').click(function() {
		paused = true;
		$('.slides > div:first')
		.fadeOut(1000)
		.next()
		.fadeIn(1000)
		.end()
		.appendTo('.slides');
	});
		
	$('.prevBtn').click(function() {
		paused = true;
		$('.slides > div:last')
		.fadeIn(1000)
		.prependTo('.slides')
		.next()
		.fadeOut(1000)
		.end();
	});

	setInterval(function() {
		if (paused === false) { 
			$('slides > div:first')
			.fadeOut(1000)
			.next()
			.fadeIn(1000)
			.end()
			.appendTo('slides');
		};
	},  5000);   	
};

$(document).ready(slide);
 */