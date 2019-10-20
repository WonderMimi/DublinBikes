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

	hideBookBtn() {  
		if (chosenStation.bikesNb === 0 || chosenStation.status != "OPEN") {  
			  $("#book").hide();
			   if (chosenStation.status != "OPEN") {
				   $("#status").addClass("boldred");
				   $("#available-bikes").addClass("boldred");
			   } else {
				   $("#status").css("color", "green");
				   $("#available-bikes").addClass("boldred");
			   }; 
		 } else {
		   $("available-bikes").css({
			   color: "black",     //FIXME: does not work if red or orange stations were selected before.
			   fontWeight: 400
		   });
			   $("#book").show();
	 }};

	displayInfos() {	
		$("#address").html(this.address);
		$("#status").html(this.status);
		if (this.status === "CLOSED") { 
			$("#status").text("Fermée");
			$("#status").css({"font-weight": "bold", "color": "red"});
		} else {
			$("#status").text("Ouverte");
			$("#status").css({"font-weight": "bold", "color": "green"});
		};
		$("#places").html(this.stands);
		$("#available-bikes").html(this.bikesNb);
		station_details.style.display = "block";
		this.hideBookBtn();
	};
};