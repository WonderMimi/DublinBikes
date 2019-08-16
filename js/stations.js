class Station {
	// définition des propriétés
	constructor(station) { // le constructor n'est utilisé qu'à la création d'un nouvel objet
		this.name = station.name;
		this.address = station.address;
		this.position = station.position;
		this.status = station.status;
		this.stands = station.bike_stands;
		this.bikesNb = station.available_bikes;
		this.marker = station.marker;
	};

	displayInfos() {
		document.getElementById("address").innerHTML = this.address;
		document.getElementById("status").innerHTML = this.status;
		if (this.status === "CLOSED") {
			document.getElementById("status").textContent = "Fermée";
			document.getElementById("status").style.cssText = "font-weight: bold; color: red;";
		} else {
			document.getElementById("status").textContent = "Ouverte";
			document.getElementById("status").style.cssText = "font-weight: bold; color: green;";
		};
		document.getElementById("places").innerHTML = this.stands;
		document.getElementById("available-bikes").innerHTML = this.bikesNb;
		station_details.style.display = "block";
		hideBookBtn();
	};


	/*   // définition des méthodes
	getavailableSpace () {
	  return this.bike_standss;
	};   

	getAvailableBikes() {
	  return this.bikesNb;
	}; */
}