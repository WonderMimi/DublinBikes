// timer object
class Timer {
    constructor() {
        this.timerElt = document.querySelector('#timer');  // html element where to display booking infos + countdown
        this.min = 20;    // sets the minutes
        this.sec = 0;    // sets the seconds
        this.canvasSubmit = document.getElementById("canvas_submit");  // submit btn of canvas
    }

    startCountdown() {
        const timer = setInterval(() => {  
            if ((this.sec >= 1)) {          
                this.sec--;
            }
            // Manages secondes to minutes transition
            if (this.sec === 0 && this.min > 0) {     
                this.sec = 59;
                this.min--;
            }
            // Adds leading zeros when minutes or secondes are under 10
            if (this.min < 10) {
                this.min = ('0' + this.min).slice(-2);
            }
            if (this.sec < 10) {
                this.sec = ('0' + this.sec).slice(-2);
            }

            if ((this.min >= 0) && (this.sec > 0)) {     // if there is time left
                sessionStorage.setItem('reservation', true);
                sessionStorage.setItem('secondes', this.sec);
                sessionStorage.setItem('minutes', this.min);
                $("#time").text(this.min+ ' mins ' + this.sec + ' secs'); 

                // if user clicks on map when timer is still running => confirm msg
                let stations = document.querySelectorAll('.leaflet-marker-icon'); 
                stations.forEach ((station) => {
                    station.addEventListener('click', function() {
                        if (sessionStorage.getItem('reservation')) {   
                            $modalTitle.text('Attention !');
                            const msg2 = document.querySelector('.modal-message');
                            msg2.innerHTML ='Une réservation est déjà en cours. Voulez-vous l\'annuler ?';
                            $resetModal.text('Non');
                            $okBtn.text('Oui');
                            $resetModal.show();
                            $modal.show();
                        };                        
                    })
                });
               
                $okBtn.on('click', function(e) {
                    clearInterval(timer);
                    sessionStorage.clear();
                });

                $resetModal.on('click', function(e) {
                    $modal.hide();
                });
                              
                // if user refreshes tab when timer is still running => alert msg => still display timer                
                if (sessionStorage.getItem('reservation')) {
                    window.addEventListener("beforeunload", function(e) {
                        var message = "Attention, une réservation est en cours ! Elle sera annulée si vous continuez";
                        e.returnValue = message;
                        return message;
                    })       
                };
            } else {  // no time left
                clearInterval(timer);  
                this.timerElt.innerHTML = 'Votre réservation a expiré';
                $('#timer_reset').hide(); 
                $('#station_details').hide();
                sessionStorage.setItem('reservation', false);
                sessionStorage.setItem('secondes', 0);
                sessionStorage.setItem('minutes', 20);
            }      
        }, 1000)
    };

    displayTimer() {
        this.canvasSubmit.addEventListener('click', () => {
            sessionStorage.clear()
            this.startCountdown();
            $("#timer_firstname").text($("#firstname").val());
            $("#timer_name").text($("#name").val());
            $("#timer_station").text(chosenStation.name); 
        })
    }
}

const countdown = new Timer(document.querySelector("#time"), 1200);
countdown.displayTimer();


/*************************    MODAL    **************************/

const $modal = $("#simpleModal");               // Gets the modal element
const $modalTitle = $('.modal-title');          // Ges the title of the modal
const $modalBtn = $("#timer_reset");            // Gets cancel booking button
const $closeBtn = $(".closeBtn");               // Gets close button (X)
const $okBtn = $("#ok");                        // Gets "ok" button
const $resetModal = $('#resetModal');           // Gets the cancel button
$modalBtn.on("click", openModal);               // Listens for the open click
$okBtn.on('click', closeModal);                 // Listens for the click on the ok button

             
// Function to open the modal
function openModal() {     
    $resetModal.hide();   
    $modalTitle.text('Confirmation');   
    const msg1 = document.querySelector('.modal-message');
    msg1.innerHTML ='Votre réservation a bien été annulée';  
    $okBtn.text('OK');             
    $modal.show();
};

// Function to close the modal and reset timer
function closeModal() {
    $modal.hide();
    $(".timer").hide(); 
    $('#station_details').hide();
    sessionStorage.clear();
    sessionStorage.setItem('reservation', false);
    sessionStorage.setItem('secondes', 0);
    sessionStorage.setItem('minutes', 20);
};

// Function to close modal if clicked outside
function outsideClick(e) {
    if (e.target == $modal) {
        $modal.hide();
        $(".timer").hide(); 
        $('#station_details').hide();
        sessionStorage.clear();
    /*  sessionStorage.setItem('reservation', false);
        sessionStorage.setItem('secondes', 0);
        sessionStorage.setItem('minutes', 20); */
    };
};