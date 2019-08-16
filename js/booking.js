// declaration des variables pour sélectionner les elements HTML
const bookBtn = $("#book"); //document.querySelector('#book');
const form = document.querySelector('.form');
const formSubmitBtn = $("#form_submit");

// hides "book" button if no bike is available or station is not opened
function hideBookBtn() {  
 	if (chosenStation.bikesNb === 0 || chosenStation.status != "OPEN") {  
   		$("#book").hide();
			if (chosenStation.status != "OPEN") {
				$("#status").css({
					color: "red",
					fontWeight: 700
				});
				$("#available-bikes").css({
					color: "red",
					fontWeight: 700
				});
			} else {
				$("#status").css("color", "green");
				$("#available-bikes").css({
					color: "red",
					fontWeight: 700
				});
			}; 
  	} else {
		$("available-bikes").css({
			color: "black",
			fontWeight: 400
		});
   		 $("#book").show();
  };
}

// shows booking form on "book" button click
$("#book").click(function() {
  	form.style.display = "block";
})

//TODO: utiliser FormData object pour récupérer les infos du form https://flaviocopes.com/formdata/

// shows canvas on form "submit" button click
const canvasElt = document.querySelector(".canvas");

formSubmitBtn.click(function(e){
	let name = form.elements.name.value;
    let firstname = form.elements.firstname.value;
    if (name == "" || firstname == "") { // checks that name and firstname fields are not empty
        let warning = document.createElement("p");   
        warning.textContent = ("Les champs 'nom' et 'prénom' sont obligatoires");
        warning.style.color = "red";
        $("form").append(warning);     //FIXME: make sure warning msg displayed only once even if btn is clicked many times (use boolean)
    } else {
        e.preventDefault();
        form.style.display = "none";
        canvasElt.style.display = "block";
    };
})

//TODO: implement LocalStorage and SessionStorage