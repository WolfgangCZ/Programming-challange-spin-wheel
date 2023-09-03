'use strict';
function drawCircle(context, x, y, radius)
{  
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.lineWidth = 1;
        context.stroke();
}



(() => {
    console.log("===START===");
    const canvas = document.getElementById('wcanvas');
    const context = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = 500;
    window.addEventListener("resize", function(width, height){
        width = window.innerWidth;
        height = window.innerHeight;
    });
    height = canvas.height;


    const inRadius = 10;
    const outRadius = 30;


    drawCircle(context, width/2, height/2, inRadius);
    drawCircle(context, width/2, height/2, outRadius);

    console.log("===FINISH===");
})();
/*
context.fillStyle = "green";
context.fillRect(10, 10, 150, 100);
*/
