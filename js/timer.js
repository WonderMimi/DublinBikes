let name = form.elements.name.value;
let firstname = form.elements.firstname.value;
let intervalId;

// timer object
const timer = {
    minutes: 20,

    startCountdown() {
        if (this.minutes > 0) {
            this.minutes--;
            document.getElementById("time").textContent = this.minutes;
        } else {
            clearInterval(intervalId);
            document.querySelector("#timer").style.display = "none";   
            document.querySelector("#timer_reset").style.display = "none";
            let expiration = document.getElementById("timer_msg");  
            expiration.textContent = "Votre réservation est expirée.";
            setTimeout(function () {
                expiration.textContent = "Merci d'effectuer une nouvelle réservation";
            }, 3000);
        }
    }
}

// Inserts dynamic infos into message dispkayed
function displayUserInfos() {
    document.getElementById("timer_firstname").textContent = firstname;
    document.getElementById("timer_name").textContent = name;
    document.getElementById("timer_station").textContent = chosenStation.name;

    // Run startCountdown function every minutes
    intervalId = setInterval(function () {
        timer.startCountdown()
    }, 60000);    
};

// Gets the modal element
const modal = document.getElementById("simpleModal");
// Gets cancel booking button
const modalBtn = document.getElementById("timer_reset");
// Gets close button (X)
const closeBtn = document.querySelector(".closeBtn");
// Listens for the open click
modalBtn.addEventListener("click", openModal);
// Listens for the click on the X button
closeBtn.addEventListener("click", closeModal);
// Listens for outside modal click
window.addEventListener("click", outsideClick);
// Function to open the modal
function openModal() {
    modal.style.display = "block";
}
// Function to close the modal
function closeModal() {
    modal.style.display = "none";
    document.querySelector(".timer").style.display = "none"; 
}
// Function to close modal if clicked outside
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = "none";
        document.querySelector(".timer").style.display = "none"; 
    };
}