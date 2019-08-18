// declaration des variables pour sélectionner les elements HTML
const form = document.querySelector('.form');
const formSubmitBtn = $("#form_submit");

// hides "book" button if no bike is available or station is not opened
function hideBookBtn() {  
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
  };
}

// shows booking form on "book" button click
$("#book").click(function() {
  	form.style.display = "block";
})

// shows canvas on form "submit" button click
const canvasElt = document.querySelector(".canvas");

formSubmitBtn.click(function(e){
	let name = form.elements.name.value;
	// localStorage.setItem("formName": name);
	let firstname = form.elements.firstname.value;
	// localStorage.setItem("formFirstname": firstname);
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