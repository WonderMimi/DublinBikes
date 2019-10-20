// Fichier OO commencé en session le 24/09
function Canvas() {

    this.init = function () {
        eventsManager ();
    };

    const eventsManager = function () {
        let paint = false;
        var clickX = [];
        var clickY = [];
        var clickDrag = [];  
        let context = function() {
            $('canvas').getContext("2d");
        }
        context.strokeStyle = "#000000";
        context.lineJoin = "round";
        context.lineWidth = 3;

        // Adds information where the user clicked at.
        const addClick = function (x, y, dragging) {              
            clickX.push(x); // adds clicks position x value to array
            clickY.push(y); // adds clicks position y value to array
            clickDrag.push(dragging);
        };

        // Redraw the complete canvas.
        const redraw = function () {
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
        };

        const drawNew = function () {
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
        };

        const mouseDownEventHandler = function (e) { // detects mouse down event
            paint = true;
            let x = e.pageX - canvas.offsetLeft; // the offset returns the number of pixels that the upper left corner of the canvas is offset to the left of the containing layer.
            let y = e.pageY - canvas.offsetTop;
            if (paint) {
                addClick(x, y, false);
                drawNew();
            }
        };

        const touchstartEventHandler = function (e) { // same as above but for touchscreens
            paint = true;
            if (paint) {
                addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY -
                    canvas.offsetTop, false);
                drawNew();
            }
        };

        const mouseUpEventHandler = function (e) { // stops drawing when mouse is up
            context.closePath();
            paint = false;
        };
        
        const mouseMoveEventHandler = function (e) {
            let x = e.pageX - canvas.offsetLeft;
            let y = e.pageY - canvas.offsetTop;
            if (paint) {
                addClick(x, y, true);
                drawNew();
            }
        };

        const touchMoveEventHandler = function (e) { // same as above but for touchscreens
            if (paint) {
                addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY -
                    canvas.offsetTop, true);
                drawNew();
            }
        };

        const setUpHandler = function (isMouseandNotTouch, detectEvent) { // detects if mouse or touch is used
            if (isMouseandNotTouch) {
                $("canvas").on("mouseup", mouseUpEventHandler);
                $("canvas").on("mousemove", mouseMoveEventHandler);
                $("canvas").on("mousedown", mouseDownEventHandler);
                mouseDownEventHandler(detectEvent);
            } else {
                $("canvas").on("touchstart", touchstartEventHandler);
                $("canvas").on("touchmove", touchMoveEventHandler);
                $("canvas").on("touchend", mouseUpEventHandler);
                touchstartEventHandler(detectEvent);
            }
        };

        const mouseWins = function (e) {
            setUpHandler(true, e);
        };
    
        const touchWins = function (e) {
            setUpHandler(false, e);
        }; 

/*         const  removeRaceHandlers = function () {
            canvas.removeEventListener("mousedown", mouseWins);
            canvas.removeEventListener("touchstart", touchWins);
        };
 */
        $("#canvas").on('mousedown', mouseWins);
        $("#canvas").on('touchstart', touchWins);

    };
};

const canvas = new Canvas();
canvas.init();

