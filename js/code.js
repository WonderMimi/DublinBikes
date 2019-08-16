//===========================  SLIDER  ===========================
let slideIndex = 1;
showSlide(slideIndex);    // shows slide nb 1

function plusSlides(n) {
    showSlide(slideIndex += n);  // incremente le nb de slide
}

function currentSlide(n) {
    showSlide(slideIndex = n);     // defini la slide actuelle
}

function showSlide(n) {
    let i;
    let slides = document.getElementsByClassName("item_image");
    let dots = document.getElementsByClassName("dots");
    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) { 
        slideIndex = slides.length;
    }

    for ( i = 0 ; i < slides.length ; i++ ) {
        slides[i].style.display = "none";
    }

    for ( i = 0 ; i < dots.length ; i++ ) {
        dots[i].className = dots[i].className.replace("active"," ");
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += "active";
}

//===========================  CARTE  ===========================
// Création de la carte

let map = L.map('map').setView([53.350140, -6.266155], 14);  // set the default viewpoint and zoom level when page is loaded

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//=========== Add a default pop-up for Dublin City center

L.marker([53.506440, -6.469205]).addTo(map)  // add a special marker ;)
    .bindPopup('Ma maison');
  
L.marker([53.35, -6.27]).addTo(map)
    .bindPopup('Dublin centre.<br> Irlande.')
    .openPopup();

//===========================  STATION  ===========================

// Récupération des données de l'API JCDecaux

let url = "https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=f4acc43df12b9a528b1a84f023e1082dd0ec24b7";

// Exécute un appel AJAX GET
// Prend en paramètres l'URL définie au-dessus et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
  let req = new XMLHttpRequest();                    // Instanciation de l'objet XMLHttprequest
  req.open("GET", url);                              // lancement de la requete vers l'Url de JCDecaux
  req.addEventListener("load", function () {         // pourquoi on n'utilise pas httpRequest.onreadystatechange = callback() {.....};
      if (req.status >= 200 && req.status < 400) {   // vérification de l'état de la requête (absence d'erreur)
                                                     // Appelle la fonction callback en lui passant la réponse de la requête
          callback(req.responseText);                // callback est une fonction utilisée pour traiter les données
      } else {
          console.error(req.status + " " + req.statusText + " " + url);
      }
  });
  req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + url);
  });
  req.send(null);
}

ajaxGet(url, function (reponse) {
    // Transforme la réponse en tableau d'objets JavaScript
    let stations = JSON.parse(reponse);
    // Affiche chaque station
    stations.forEach(function (station) {
        let theStation = new Station(station); 
        let marker = L.marker(station.position)
        .bindPopup(station.name).addTo(map);   // add a popup with station name onto map
        marker.addEventListener("click", function() {
            theStation.displayInfos();
        });
    });
});

class Station {
    // définition des propriétés
    constructor(station) {  // le constructor n'est utilisé qu'à la création d'un nouvel objet
       this.name = station.name;              
       this.address = station.address;
       this.position = station.position;
       this.status = station.status;
       this.stands = station.bike_stands;
       this.bikesNb = station.available_bikes;
       this.marker = station.marker;
     }
 
       displayInfos() {
         document.getElementById("address").innerHTML = this.address;
         document.getElementById("status").innerHTML = this.status;
         document.getElementById("places").innerHTML = this.stands;
         document.getElementById("available-bikes").innerHTML = this.bikesNb;
       }
 
     // définition des méthodes
     getavailableSpace () {
       return this.bike_standss;
     }
 } 
 
//===========================  CANVAS  ===========================

function sign() {
    let canvas = document.getElementById("canvas");

    if (canvas.getContext) {        // checks if browser supports canvas tag
        let ctx = canvas.getContext("2d");    // following code is executed if canvas is supported
        ctx.canvas.addEventListener("mousemove", function (event) {
            let mouseX = event.layerX - ctx.canvas.offsetLeft;  // the offset returns the number of pixels that the upper left corner of the canvas is offset to the left of the containing layer.
            let mouseY = event.layerY - ctx.canvas.offsetTop;
            let position = document.getElementById("position");
            position.innerHTML = mouseX + " | " + mouseY;
            });
    } else {    // fallback message displayed when browser does not support canvas tag              
        let paragrapheElt = document.createElement("p");
        paragrapheElt.id("fallback_msg");
        paragrapheElt.textContent = "Désolé, votre navigateur ne supporte pas Canvas. Essauez dans un autre navigateur";
        canvas.appendChild(paragrapheElt);
        }
}

window.addEventListener('load', function() {
    sign();
});
//===========================  TIMER  ===========================

const timer = {
    hours: 00,
    minutes: 20,

    startCountdown() {
        let timerElt = document.getElementById("timer");
        let time = Number(timerElt.textContent);
        if (time > 1) {
            timerElt.textContent = time -1;
        } else {
            clearInterval(intervalId);
            let expiration = document.getElementById("timer_msg");
            expiration.textContent = "Votre réservation est expirée.";
            setTimeout (function () {
                expiration.textContent = "Merci de faire une nouvelle réservation";
            }, 2000);
        }
    }

}