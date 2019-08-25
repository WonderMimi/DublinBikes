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
		
		$("#address").html(this.address);
		$("#status").html(this.status);
		if (this.status === "CLOSED") {  //TODO : add markers colors
			$("#status").text("Fermée");
			$("#status").css({"font-weight": "bold", "color": "red"});
		} else {
			$("#status").text("Ouverte");
			$("#status").css({"font-weight": "bold", "color": "green"});
		};
		$("#places").html(this.stands);
		$("#available-bikes").html(this.bikesNb);
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