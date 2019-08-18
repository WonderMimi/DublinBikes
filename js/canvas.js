// sets canvas and context variables
let canvas = document.getElementById("canvas");

if (canvas.getContext) {
    let context = canvas.getContext("2d");

    // defines line style
    context.strokeStyle = "#000000";
    context.lineJoin = "round";
    context.lineWidth = 3;

    //creates empty variables to collect mouse clicks coordinates and actions
    let clickX = [];
    let clickY = [];
    let clickDrag = [];
    let paint;

    // Adds information where the user clicked at.
    function addClick(x, y, dragging) {
        clickX.push(x); // adds clicks position x value to array
        clickY.push(y); // adds clicks position y value to array
        clickDrag.push(dragging);
    }

    // Redraw the complete canvas.
    function redraw() {
        // Clears the canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        for (var i = 0; i < clickX.length; i += 1) {
            if (!clickDrag[i] && i == 0) {
                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            } else if (!clickDrag[i] && i > 0) {
                context.closePath();

                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            } else {
                context.lineTo(clickX[i], clickY[i]);
                context.stroke();
            }
        }
    }

    // Draws the newly added point.
    function drawNew() {
        let i = clickX.length - 1
        if (!clickDrag[i]) {
            if (clickX.length == 0) {
                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            } else {
                context.closePath();

                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            }
        } else {
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
    }

    function mouseDownEventHandler(e) { // detects mouse down event
        paint = true;
        let x = e.pageX - canvas.offsetLeft; // the offset returns the number of pixels that the upper left corner of the canvas is offset to the left of the containing layer.
        let y = e.pageY - canvas.offsetTop;
        if (paint) {
            addClick(x, y, false);
            drawNew();
        }
    }

    function touchstartEventHandler(e) { // same as above but for touchscreens
        paint = true;
        if (paint) {
            addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY -
                canvas.offsetTop, false);
            drawNew();
        }
    }

    function mouseUpEventHandler(e) { // stops drawing when mouse is up
        context.closePath();
        paint = false;
    }

    function mouseMoveEventHandler(e) {
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;
        if (paint) {
            addClick(x, y, true);
            drawNew();
        }
    }

    function touchMoveEventHandler(e) { // same as above but for touchscreens
        if (paint) {
            addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY -
                canvas.offsetTop, true);
            drawNew();
        }
    }

    function setUpHandler(isMouseandNotTouch, detectEvent) { // detects if mouse or touch is used
        removeRaceHandlers();
        if (isMouseandNotTouch) {
            canvas.addEventListener("mouseup", mouseUpEventHandler);
            canvas.addEventListener("mousemove", mouseMoveEventHandler);
            canvas.addEventListener("mousedown", mouseDownEventHandler);
            mouseDownEventHandler(detectEvent);
        } else {
            canvas.addEventListener("touchstart", touchstartEventHandler);
            canvas.addEventListener("touchmove", touchMoveEventHandler);
            canvas.addEventListener("touchend", mouseUpEventHandler);
            touchstartEventHandler(detectEvent);
        }
    }

    function mouseWins(e) {
        setUpHandler(true, e);
    }

    function touchWins(e) {
        setUpHandler(false, e);
    }

    function removeRaceHandlers() {
        canvas.removeEventListener("mousedown", mouseWins);
        canvas.removeEventListener("touchstart", touchWins);
    }

    canvas.addEventListener("mousedown", mouseWins);
    canvas.addEventListener("touchstart", touchWins);

    // checks that canvas is not blank b4 validating booking
    let canvasSubmit = document.getElementById("canvas_submit");
    let warning = document.createElement("p"); //FIXME: make sure warning msg displayed only once even if btn is clicked many times (use boolean)
    var warningMsgDisplayed = false;
    canvasSubmit.addEventListener("click", function () {
        timer.minutes = 20; //FIXME: does not reset timer
        if (canvas.toDataURL() ==
            document.getElementById("blank_canvas").toDataURL()) {
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
            canvasElt.style.display = "none";
            $('.timer').show();
            displayUserInfos();
        }
    })

    // Clears the canvas when "clear" button is clicked
    $("#canvas_clear").click(function () {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    })

    // Clears and hides canvas when "cancel" btn is clicked
    $("#canvas_cancel").click(function () {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        canvasElt.style.display = "none";
        warning.style.display = "none";
        warningMsgDisplayed = false;
    })
} else {
    alert("Votre navigateur ne supporte pas cette fonctionnzlité. Veuillez essayer avec un autre navigateur.");
}; 