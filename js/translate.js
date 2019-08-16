// assigns language btn content to variable
let lang = document.getElementById("language").textContent;

// Starts translation when language button is clicked
document.getElementById("language").addEventListener("click", function() {
    if (lang === "fr") {
        translateToEN();
    } else {
        translateToFR();
    }
})

// Translates strings into English
function translateToEN () {
// STATION DETAILS    
    document.getElementById("detailsDeLaStation").textContent = "Station details";
    document.getElementById("station_adresse").textContent = "Address: ";
    document.getElementById("station_statut").textContent = "Status: ";
    document.getElementById("nbDePlaces").textContent = "Number of places: ";
    document.getElementById("availableBikes").textContent = "Available bike(s): ";
    document.getElementById("book").textContent = "Book";
// FORM
    document.getElementById("form_title").textContent = "Booking form";
    document.getElementById("name_label").textContent = "Name";
    document.getElementById("firstname_label").textContent = "Firstname";
    document.getElementById("form_submit").textContent = "Submit";
    document.getElementById("form_reset").textContent = "Cancel";
// CANVAS
    document.getElementById("canvas_submit").textContent = "Submit";
    document.getElementById("canvas_clear").textContent = "Clear";
    document.getElementById("canvas_cancel").textContent = "Cancel";
// TIMER    
    document.getElementById("bonjour").textContent = "Hello ";
    document.getElementById("time_left").textContent = "You only have ";
    document.getElementById("gotostation").textContent = "minutes to go get your bike at the station ";
    document.getElementById("reset").textContent = "Cancel my booking";
// FOOTER    
    document.getElementById("copyright").textContent = "This website has been created by Myriam Demaine as a student project - 2019"; 
// TOOGLE language
    document.getElementById("language").textContent = "en";
    lang = "en";
};

// Translates strings into French
function translateToFR () {
// STATION DETAILS    
    document.getElementById("detailsDeLaStation").textContent = "Détails de la station";
    document.getElementById("station_adresse").textContent = "Adresse : ";
    document.getElementById("station_statut").textContent = "Statut : ";
    document.getElementById("nbDePlaces").textContent = "Nombre de place(s) : ";
    document.getElementById("availableBikes").textContent = "Vélo(s) disponible(s) : ";
    document.getElementById("book").textContent = "Réserver";
// FORM
    document.getElementById("form_title").textContent = "Formulaire de réservation";
    document.getElementById("name_label").textContent = "Nom";
    document.getElementById("firstname_label").textContent = "Prénom";
    document.getElementById("form_submit").textContent = "Envoyer";
    document.getElementById("form_reset").textContent = "Annuler";   
// CANVAS
    document.getElementById("canvas_submit").textContent = "Valider";
    document.getElementById("canvas_clear").textContent = "Effacer";
    document.getElementById("canvas_cancel").textContent = "Annuler";
// TIMER    
    document.getElementById("bonjour").textContent = "Bonjour ";
    document.getElementById("time_left").textContent = ", il ne vous reste plus que ";
    document.getElementById("gotostation").textContent = " minute(s) pour récupérer le vélo réservé à la station ";
    document.getElementById("reset").textContent = "Annuler ma réservation";
// FOOTER    
    document.getElementById("copyright").textContent = "Ce site est le travail étudiant de Myriam Demaine - 2019"; 
// TOOGLE language
    document.getElementById("language").textContent = "fr";
    lang = "fr";
};
