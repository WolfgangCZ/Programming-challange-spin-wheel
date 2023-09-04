'use strict';
console.log("===START===");

const basicLanguageList = [
    "C",
    "C++",
    "C#",
    "Javascript",
    "Java",
    "Python",
    "HTML, CSS, JS",
    "PHP",
    "Rust",
    "Golang",
    "you choose"
];

const extendedLanguageList = [
    "Kotlin",
    "Swift",
    "R",
    "Typescript",
    "Scala",
    "Jai",
    "Badh",
    "SQL",
    "Perl",
    "Matlab",
    "Ruby",
    "NoSQL"
];

const paradigmOptions = [
    "Object oriented programming",
    "Functional programming"
];

const otherOptions = [
    "no framework",
    "framework allowed"
];

const easyChallenges = [
    "Snake game",
    "pong game",
    "arbitrary sort. algorithm",
    "word finder",
    "calendar",
    "calculator",
    "simple ML model (adder)",
    "encrypt, decrypt file",
    "10 fingers typing checker",
    "hashing algorithm",
    "you choose",
];

const mediumChallenges = [
    "sort. algo with GUI",
    "music player",
    "video player",
    "ftp client",
    "chatbot",
    "massenger",
    "face tracking",
    "snake AI",
    "pong AI",
    "some game with AI",
    "chess",
    "battleships",
    "game of life",
    "nubmers recognizer",
    "web scraper",
];

const hardCHallenges = [
    "programming language",
    "video subtitle generator",
    "meme generator",
    "web search engine",
    "graphics library",
    "arbitrary compiler",
    "news sentiment analizer",
];



class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
};

class Line2d
{
    constructor(start, end)
    {
        this.start = new Vector2(start.x, start.y);
        this.end = new Vector2(end.x, end.y);
    }
    lenght()
    {
        return Math.sqrt((this.end.x-this.start.x)*(this.end.x-this.start.x)+(this.end.y-this.start.y)*(this.end.y-this.start.y));
    }
    draw(context)
    {
        DrawLineLine(context, this);
    }
    setAngle(rad)
    {
        const lenght = this.lenght();
        let x = this.end.x - this.start.x;
        let y = this.end.y - this.start.y;

        if(x >= 0 && y >= 0)
        {
            x = lenght*Math.cos(rad);
            y = lenght*Math.sin(rad);
        }
        else if(x >= 0 && y <= 0)
        {
            x = lenght*Math.cos(rad);
            y = -lenght*Math.sin(rad);
        }
        else if(x <= 0 && y <= 0)
        {
            x = -lenght*Math.cos(rad);
            y = -lenght*Math.sin(rad);
        }
        else if(x <= 0 && y >= 0)
        {
            x = -lenght*Math.cos(rad);
            y = lenght*Math.sin(rad);
        }

        this.end.x = x + this.start.x;
        this.end.y = y + this.start.y;
    }
    getAngle()
    {
        
    }
};

function DrawLineXY(context, startX, startY, endX, endY)
{
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
}
function DrawLineV2(context, vec1, vec2)
{
    DrawLineXY(context, vec1.x, vec1.y, vec2.x, vec2.y);
}
function DrawLineLine(context, line)
{
    DrawLineV2(context, line.start, line.end);
}

function DrawCircle(context, x, y, radius)
{  
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.lineWidth = 1;
        context.stroke();
}
function NormalizeVector(vec)
{
    const lenght = Math.sqrt(vec.x*vec.x + vec.y*vec.y);
    return new Vector2(vec.x/lenght, vec.y/lenght);
}

window.addEventListener("resize", function(width, height){
    width = window.innerWidth;
});
function DrawText(context, text, x, y,  size, angle)
{
    context.save();
    context.font = "30px Arial";
    context.translate(x,y)
    context.rotate(-angle);
    context.font = `${size}px Arial`;
    context.fillText(text, 0, size/2.5);
    context.restore();
}
function DrawWheel(context, center, wheelTop, list, count, angleMod)
{
    let lines = [];
    const radius = center.y-wheelTop.y;
    for(let i = 0; i < count; i++)
    {
        if(count === 1) break;
        const rad = Math.PI*2/count;
        let angle = (rad/2 + rad*i + angleMod);
        let line = new Line2d(center, wheelTop);
        let textLine = new Line2d(center, new Vector2(wheelTop.x, wheelTop.y+radius/1.3));
        const textSize = (radius)/15;
        line.setAngle(angle);
        textLine.setAngle(angle-rad/2);
        DrawText(context, list[i], textLine.end.x, textLine.end.y, textSize, angle-rad/2);
        lines.push(line);
    }
    
    for(let i = 0; i < count; i++)
    {
        lines[i].draw(context);
    }
}

let start;
let timestamp = Date.now(); 
let dt = 0;

function step(timestamp)
{
    if(start === undefined)
    {
        start = timestamp;
    }
    const elapsed = (timestamp - start)/1000;
    dt = elapsed;
    
    run();
    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

let speed = 0; //1 speed = 1 degree per second
let elapsedSpin = 0;
let wheelIsSpinning = false;
let lastFPS = 0;

//===============================================================
function run()
{
    const baseFps = 60;
    let fps = dt*baseFps;
    dt = Math.round(dt);
    fps = Math.round(fps);
    console.log(dt);
    const canvas = document.getElementById('wcanvas');
    const context = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = 500;
    canvas.width = width;
    canvas.height = 500;
    const textX = 50;
    const textY = 50;
    DrawText(context, "HELLO WORLD", textX, textY, 15, Math.PI/8);
    DrawCircle(context, textX, textY, 3);
    
    const inRadius = 10;
    const outRadius = 200;
    const sectors = ["sector1", "sector2", "sector3"];
    const sectorCount = sectors.length;
    const center = new Vector2(width/2, height/2);
    const wheelTop = new Vector2(width/2, height/2 - outRadius);
    const angleDEG = 260;
    const angleRAD = angleDEG * Math.PI/180;
    let line1 = new Line2d(center, wheelTop);
    line1.setAngle(angleRAD);
    //line1.draw(context);

    const startSpin = document.getElementById("start-spin");
    const stopSpin = document.getElementById("stop-spin");
    startSpin.addEventListener("click", function()
    {
        speed = 40;
        wheelIsSpinning = true;
    });
    stopSpin.addEventListener("click", function()
    {
        speed = 0;
        wheelIsSpinning = false;
    });
    if(wheelIsSpinning)
    {
        elapsedSpin = fps*Math.PI/180/baseFps*speed;
    }
    DrawWheel(context, center, wheelTop, mediumChallenges, mediumChallenges.length, elapsedSpin, 30);
    DrawCircle(context, center.x, center.y, inRadius);
    DrawCircle(context, center.x, center.y, outRadius);

    console.log("===FINISH===");
}
    