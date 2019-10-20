function Form() {

	this.init = function () {
		displayForm();
		validateForm();
		cancelForm();
	};
	
	const displayForm = function () {
		$("#book").on("click", function () {
			$("#bookingForm").show();
			$name = localStorage.getItem("formName");
			$firstname = localStorage.getItem("formFirstname");
		});
	};

	const validateForm = function () {
		$("#form_submit").on("click", function (e) {
			e.preventDefault();
			let $name = $("#name").val();
			let $firstname = $('#firstname').val();
			if ($name !== ""  && $firstname !== "") { // checks that name and firstname fields are not empty
				$(".form").hide();
				$(".canvas").show();	
			} else {
				let warning = document.createElement("p");   
				warning.textContent = ("Les champs 'nom' et 'prÃ©nom' sont obligatoires");
				warning.style.color = "red";
				$("form").append(warning);  
			};

			const storeData = function () {
				let $name = $("#name").val();
				let $firstname = $('#firstname').val();
				localStorage.setItem("formName", $name);
				localStorage.setItem("formFirstname", $firstname);
				localStorage.getItem("formName");
				localStorage.getItem("formFirstname");
			};

			storeData();
		})
	};

	const cancelForm = function() {
		$("#form_reset").on("click", function () {
			$(".form").hide();
		})
	}
}

const form = new Form();
form.init();
