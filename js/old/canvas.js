// 1er fichier OO

class Canvas {
    constructor() {
        this.canvas = document.querySelector("#canvas");
        this.context = this.canvas.getContext("2d");
        this.canvasClearBtn = document.querySelector("#canvas_clear");
        this.canvasCancelBtn = document.querySelector("#canvas_cancel");
        this.paint = false;
        //creates empty variables to collect mouse clicks coordinates and actions
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];      
    }

    init() {
        // defines line style
        this.context.strokeStyle = "#000000";
        this.context.lineJoin = "round";
        this.context.lineWidth = 3;
        this.redraw();
        this.useMouse();
        this.useTouch();
        this.clearCanvas();
        this.cancelCanvas() ;
    }

    // Adds information where the user clicked at.
    addClick(x, y, dragging) {  
        this.clickX.push(x); // adds clicks position x value to array
        this.clickY.push(y); // adds clicks position y value to array
        this.clickDrag.push(dragging);
    }

    // Redraw the complete canvas.
    redraw() {
        // Clears the canvas
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        for (var i = 0; i < this.clickX.length; i += 1) {
            if (!this.clickDrag[i] && i == 0) {
                this.context.beginPath();
                this.context.moveTo(this.clickX[i], this.clickY[i]);
                this.context.stroke();
            } else if (!this.clickDrag[i] && i > 0) {
                this.context.closePath();

                this.context.beginPath();
                this.context.moveTo(this.clickX[i], this.clickY[i]);
                this.context.stroke();
            } else {
                this.context.lineTo(this.clickX[i], this.clickY[i]);
                this.context.stroke();
            }
        }
    }

    // Draws the newly added point.
    drawNew() {
        let i = this.clickX.length - 1
        if (!this.clickDrag[i]) {
            if (this.clickX.length == 0) {
                this.context.beginPath();
                this.context.moveTo(this.clickX[i], this.clickY[i]);
                this.context.stroke();
            } else {
                this.context.closePath();

                this.context.beginPath();
                this.context.moveTo(this.clickX[i], this.clickY[i]);
                this.context.stroke();
            }
        } else {
            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.stroke();
        }
    }

    mouseDownEventHandler(e) { // detects mouse down event
        this.paint = true;
        let x = e.pageX - this.canvas.offsetLeft; // the offset returns the number of pixels that the upper left corner of the canvas is offset to the left of the containing layer.
        let y = e.pageY - this.canvas.offsetTop;
        if (this.paint) {
            this.addClick(x, y, false);
            this.drawNew();
        }
    }

    touchstartEventHandler(e) { // same as above but for touchscreens
        this.paint = true;
        if (this.paint) {
            this.addClick(e.touches[0].pageX - this.canvas.offsetLeft, e.touches[0].pageY -
                this.canvas.offsetTop, false);
            this.drawNew();
        }
    }

    mouseUpEventHandler() { // stops drawing when mouse is up
        this.context.closePath();
        this.paint = false;
    }

    mouseMoveEventHandler(e) {
        let x = e.pageX - this.canvas.offsetLeft;
        let y = e.pageY - this.canvas.offsetTop;
        if (this.paint) {
            this.addClick(x, y, true);
            this.drawNew();
        }
    }

    touchMoveEventHandler(e) { // same as above but for touchscreens
        if (this.paint) {
            this.addClick(e.touches[0].pageX - this.canvas.offsetLeft, e.touches[0].pageY -
                this.canvas.offsetTop, true);
            this.drawNew();
        }
    }

    setUpHandler(isMouseandNotTouch, detectEvent) { // detects if mouse or touch is used
        this.removeRaceHandlers();
        if (isMouseandNotTouch) {
            this.canvas.addEventListener("mouseup", this.mouseUpEventHandler);
            this.canvas.addEventListener("mousemove", this.mouseMoveEventHandler);
            this.canvas.addEventListener("mousedown", this.mouseDownEventHandler);
            this.mouseDownEventHandler(detectEvent);
        } else {
            this.canvas.addEventListener("touchstart", this.touchstartEventHandler);
            this.canvas.addEventListener("touchmove", this.touchMoveEventHandler);
            this.canvas.addEventListener("touchend", this.mouseUpEventHandler);
            this.touchstartEventHandler(detectEvent);
        }
    }

    mouseWins(e) {
        this.setUpHandler(true, e);
    }

    touchWins(e) {
        this.setUpHandler(false, e);
    }

    removeRaceHandlers() {
        this.canvas.removeEventListener("mousedown", this.mouseWins);
        this.canvas.removeEventListener("touchstart", this.touchWins);
    }

    useMouse() {
        this.canvas.addEventListener("mousedown", this.mouseWins);
    }
    
    useTouch() {
        this.canvas.addEventListener("touchstart", this.touchWins);
    }

    // Clears the canvas when "clear" button is clicked
    clearCanvas() {
        this.canvasClearBtn.click(function () {
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        }.bind(this))
    }

    // Clears and hides canvas when "cancel" btn is clicked
    cancelCanvas() {
        this.canvasCancelBtn.click(function () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.canvas.style.display = "none";
        warning.style.display = "none";
        warningMsgDisplayed = false;
        }.bind(this))
    }    
}

const canvas = new Canvas();
canvas.init();

/*
    // checks that canvas is not blank b4 validating booking
    let canvasSubmit = document.getElementById("canvas_submit");
    let warning = document.createElement("p"); //FIXME: make sure warning msg displayed only once even if btn is clicked many times (use boolean)
    var warningMsgDisplayed = false;
    canvasSubmit.addEventListener("click", function () {
        if (canvas.toDataURL() == document.getElementById("blank_canvas").toDataURL()) {
            warning.textContent = ("Merci de signer avant de valider.");
            warning.style.cssText = "font-weight: bolder; color: red; font-size: 1.1em;"
            let canvasControls = document.querySelector("#controls");
            if (warningMsgDisplayed == false) {
                canvasControls.insertBefore(warning, canvasSubmit);
                warningMsgDisplayed = true;
            } else {
                warningMsgDisplayed = true;
            };
        } else {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            warning.style.display = "none";
            warningMsgDisplayed = false;
            $(".canvas").hide();
            $('.timer').show();
            // displayUserInfos();
        }
    })
*/    