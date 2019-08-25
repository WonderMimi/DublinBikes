/* let $name = $("#name").val();
let $firstname = $("#firstname").val(); */
let $name = $("#name").val();
localStorage.setItem("formName", $name);
// console.log(localStorage.getItem("formName"));   //TODO: To be deleted
let $firstname = $("#firstname").val();
localStorage.setItem("formFirstname", $firstname);
let intervalId;

// timer object
class Timer {
    constructor(timerElt, timeTimer) {
        this.timerElt = timerElt;
        this.timeTimer = timeTimer;
        this.min = (timeTimer - 60) / 60;
        this.sec = 59;
        this.minutes = this.min + "0";
        this.secondes = this.sec + "0";
        this.canvasSubmit = document.getElementById("canvas_submit");
        this.displayTimer();
    }

    startCountdown() {
        const timer = setInterval(() => {

            this.timeTimer--;               // Decreases timer every seconde

            if ((this.sec >= 0)) {          
                this.sec--;
            }

            if (this.sec === 0) {           // Manages secondes to minutes transition
                this.sec = 59;
                this.min--;
            }

            if ((this.min >= 0) && (this.sec >= 0)) {
                sessionStorage.setItem('secondes', this.sec);
                sessionStorage.setItem('minutes', this.min);
                sessionStorage.setItem('temps', this.timeTimer);
                console.log(sessionStorage.getItem("minutes"));
                console.log(sessionStorage.getItem("secondes"));
                console.log(sessionStorage.getItem("temps"));
            } else {
                clearInterval(timer);
            }
        },
        1000)
    }

    displayTimer() {   //FIXME: Countdown and localStorage work fine. Only a display issue
        this.canvasSubmit.addEventListener('click', () => {
            this.startCountdown();
            $("#timer_firstname").text($firstname);
            $("#timer_name").text($name);
            $("#timer_station").text(chosenStation.name);
        })
    }
}

const countdown = new Timer(document.querySelector("#time"), 1200);



/*************************    MODAL    **************************/

const $modal = $("#simpleModal");               // Gets the modal element
const $modalBtn = $("#timer_reset");            // Gets cancel booking button
const $closeBtn = $(".closeBtn");               // Gets close button (X)
$modalBtn.on("click", openModal);               // Listens for the open click
$closeBtn.on("click", closeModal);              // Listens for the click on the X button
function openModal() {                          // Function to open the modal
    $modal.show();
};

// Function to close the modal
function closeModal() {
    $modal.hide();
    $(".timer").hide(); 
};

// Function to close modal if clicked outside
function outsideClick(e) {
    if (e.target == $modal) {
        $modal.hide();
        $(".timer").hide(); 
    };
};