class Canvas {
    constructor() {
        this.canvasElt = document.querySelector('#canvas');
        this.canvasBlock = document.querySelector('.canvas');
        this.context = this.canvasElt.getContext('2d');
        this.paint = false;
        this.clearBtn = document.querySelector('#canvas_clear');
        this.submitBtn = document.querySelector('#canvas_submit');
        this.cancelBtn = document.querySelector('#canvas_cancel');

        this.signature();
    }

    getMousePos(position) {
        let rec = this.canvasElt.getBoundingClientRect();
        return {
            x: position.clientX - rec.left,
            y: position.clientY - rec.top
        }
    };

    signature() {

        // if(sessionStorage.getItem('reservation') === false) {

        this.canvasElt.addEventListener('mousedown', (e) => {
            this.paint = true;
            let mousePosition = this.getMousePos(e);
            this.context.beginPath();
            this.context.moveTo(mousePosition.x, mousePosition.y);
        });

        this.canvasElt.addEventListener('mouseup', () => {
            this.paint = false;
        });

        this.canvasElt.addEventListener('mousemove', (e) => {
            if (this.paint) {
                let mousePosition = this.getMousePos(e);
                this.context.lineTo(mousePosition.x, mousePosition.y);
                this.context.stroke();
            }
        });

        this.canvasElt.addEventListener('mouseleave', () => {
            this.paint = false;
        });

        // Erase the canvas completely
        this.clearBtn.addEventListener('click', () => {
            this.context.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height);
        });

        // Submits the canvas
        this.submitBtn.addEventListener('click', () => {
            let canvasSubmit = document.getElementById("canvas_submit");
            let warning = document.createElement("p"); //FIXME: make sure warning msg displayed only once even if btn is clicked many times (use boolean)
            var warningMsgDisplayed = false;
            if (canvas.toDataURL() == document.getElementById("blank_canvas").toDataURL()) {
                warning.textContent = ("Merci de signer avant de valider.");
                warning.style.cssText = "font-weight: bolder; color: red; font-size: 1.1em;"
                let canvasControls = document.querySelector("#controls");
                if (warningMsgDisplayed === false) {
                    canvasControls.insertBefore(warning, canvasSubmit);
                    warningMsgDisplayed = true;
                } /* else {
                    warningMsgDisplayed = true;
                } */
            } else {
                // displays timer if canvas is successfully validated
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                warning.style.display = "none";
                warningMsgDisplayed = false;
                $(".canvas").hide();
                $('.timer').show();
                // sessionStorage.setItem('reservation', true);
            };
        });

        // Cancels the canvas
        this.cancelBtn.addEventListener('click', () => {
            this.context.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height);
            this.canvasBlock.style.display = "none";
            let warning = document.createElement("p"); //FIXME: make sure warning msg displayed only once even if btn is clicked many times (use boolean)
            warning.style.display = "none";
            warningMsgDisplayed = false;
        });  
    }
}
const signature = new Canvas()