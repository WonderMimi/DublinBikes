let url = "https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=f4acc43df12b9a528b1a84f023e1082dd0ec24b7"
let chosenStation;

// Exécute un appel AJAX GET
// Prend en paramètres l'URL définie au-dessus et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    let req = new XMLHttpRequest(); // Instanciation de l'objet XMLHttprequest
    req.open("GET", url); // lancement de la requete vers l'Url de JCDecaux
    req.addEventListener("load", function () { // pourquoi on n'utilise pas httpRequest.onreadystatechange = callback() {.....};
        if (req.status >= 200 && req.status < 400) { // vérification de l'état de la requête (absence d'erreur)
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText); // callback est une fonction utilisée pour traiter les données
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
    // let marker; 

    let redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    let orangeIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    let home = L.marker([53.506450, -6.469197], {
        icon: orangeIcon
    }).bindPopup("My house").addTo(map);

    home.addEventListener("click", function () {
        alert("home sweet home");
    })

    function changeMarkerColor(station) {
        let myMarker;
        if (station.status != "OPEN") {
            myMarker = L.marker(station.position, {
                    icon: redIcon
                }).addTo(map)
                .bindPopup(station.name).addTo(map);
        } else if (station.bikesNb === 0) {
            myMarker = L.marker(station.position, {
                    icon: orangeIcon
                }).addTo(map)
                .bindPopup(station.name).addTo(map);
        } else {
            myMarker = L.marker(station.position).addTo(map)
                .bindPopup(station.name).addTo(map);
        }
        return myMarker;
    }

    // Displays each station with its marker
    stations.forEach(function (station) {
        let theStation = new Station(station);
        let myMarker = changeMarkerColor(theStation);

        myMarker.addEventListener("click", function () {          
            chosenStation = theStation;
            theStation.displayInfos();
        });
    });
})

let map = L.map('map').setView([53.350140, -6.266155], 14); // set the default viewpoint and zoom level when page is loaded

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);