'use strict';

class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
};

const testArray= [1,2,3,4,5,6,7,8];

const W_HEIGHT = 500;
const W_WIDTH = window.innerWidth;
const IN_RADIUS = 10;
const OUT_RADIUS = 200;
const WHEEL_CENTER = new Vector2(W_WIDTH/2, W_HEIGHT/2);
const WHEEL_TOP = new Vector2(W_WIDTH/2, W_HEIGHT/2 - OUT_RADIUS);
const PI = 3.1415926535;


window.addEventListener("resize", function(width, height){
     width = window.innerWidth;
 });

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
        context.arc(x, y, radius, 0, 2 * PI);
        context.lineWidth = 1;
        context.stroke();
}
function NormalizeVector(vec)
{
    const lenght = Math.sqrt(vec.x*vec.x + vec.y*vec.y);
    return new Vector2(vec.x/lenght, vec.y/lenght);
}

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
function DrawWheel(context, WHEEL_CENTER, WHEEL_TOP, list, 

    count, angleMod)
{
    let lines = [];
    const radius = WHEEL_CENTER.y-WHEEL_TOP.y;
    for(let i = 0; i < count; i++)
    {
        if(count === 1) break;
        const rad = 
    
        PI*2/count;
        let angle = (rad/2 + rad*
    
        i + angleMod);
        let line = new Line2d(WHEEL_CENTER, WHEEL_TOP);
        let textLine = new Line2d(WHEEL_CENTER, new Vector2(WHEEL_TOP.x, WHEEL_TOP.y+radius/1.3));
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

function DrawArrow(context, tip, lenght, angleRad)
{
    context.save();
    let end = new Vector2(lenght, 0);
    let upperEdge = new Vector2(lenght/2, lenght/4);
    let lowerEdge = new Vector2(lenght/2, -lenght/4);
    let upperWing= new Line2d(new Vector2(0,0), upperEdge);
    let lowerWing= new Line2d(new Vector2(0,0), lowerEdge);
    let middleLine= new Line2d(new Vector2(lenght/2,0), end);
    let cross = new Line2d(upperEdge, lowerEdge);
    context.translate(tip.x,tip.y);
    context.rotate(-angleRad);
    DrawLineLine(context, upperWing);
    DrawLineLine(context, lowerWing);
    DrawLineLine(context, middleLine);
    DrawLineLine(context, cross);
    context.restore();
}

let start;
let timestamp = Date.now();
let dt = 0;
let speed = 0; //1 speed = 1 degree per second
let elapsedSpin = 0;
let speedGoesUp = false;
let loopCount = 0;
let maxSpeed = 0;

function step(timestamp)
{
    if(start === undefined)
    {
        start = timestamp;

    }
    dt = (timestamp - start)/1000;
    start = timestamp;
    
    run();
    return;
    loopCount++;
    //console.log(dt)
    window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

let spinDuration = maxSpeed;

function SpinWheel(speed, maxSpeed, dt)
{
    if(speed < maxSpeed && speedGoesUp) 
    {
        speed += dt*0.1;
    }
    else
    {
        speed -= dt*0.1;
        speedGoesUp = false;
    }
    if(speed <= 0) speed = 0;
    return speed;
}

function EvaluateSpin(feedArray, angle, lenght)
{
    let pos = (PI*2 - angle);
    let secAngle = PI*2/lenght;
    pos = pos / (PI*2 / lenght);
    pos %= lenght-1;
    pos = Math.round(pos);

    //my brain is not big enough to solve this other than with this ugly if else statement
    if(angle < secAngle/2) 
    {
        pos = 0;
    }    
    else if(angle > secAngle/2 && angle < secAngle) 
    {
        pos = lenght - 1;
    }
    return feedArray[pos];
}

//===============================================================
function run()
{
    const canvas = document.getElementById('wcanvas');
    const context = canvas.getContext("2d");
    canvas.width = W_WIDTH;
    canvas.height = 500;
    const textX = 50;
    const textY = 50;
    DrawText(context, "HELLO WORLD", textX, textY, 15, PI/8);
    DrawCircle(context, textX, textY, 3);

    const startSpin = document.getElementById("start-spin");
    startSpin.addEventListener("click", function()
    {
        maxSpeed = (Math.random()/4 + 0.1); 
        speedGoesUp = true;
    });
    speed = SpinWheel(speed, maxSpeed, dt);
    elapsedSpin += speed;
    elapsedSpin %= Math.PI*2;
    DrawWheel(context, WHEEL_CENTER, WHEEL_TOP, 
        basicLanguageList, basicLanguageList.length, 
        elapsedSpin, 30);
    DrawCircle(context, WHEEL_CENTER.x, WHEEL_CENTER.y, IN_RADIUS);
    DrawCircle(context, WHEEL_CENTER.x, WHEEL_CENTER.y, OUT_RADIUS);
    DrawArrow(context, new Vector2(WHEEL_CENTER.x + OUT_RADIUS, WHEEL_CENTER.y), 50, 0);
    let target = EvaluateSpin(basicLanguageList, elapsedSpin, basicLanguageList.length);
    console.log(target);

}
console.log("===FINISH===");
    