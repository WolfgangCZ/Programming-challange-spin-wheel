'use strict';

console.log("===START===");


let wheelIsGoing = false;



class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
};


const W_HEIGHT = 500;
const W_WIDTH = window.innerWidth;
const IN_RADIUS = 10;
const OUT_RADIUS = 200;
const WHEEL_CENTER = new Vector2(W_WIDTH/2, W_HEIGHT/2);
const WHEEL_TOP = new Vector2(W_WIDTH/2, W_HEIGHT/2 - OUT_RADIUS);
const PI = 3.1415926535;
const canvas = document.getElementById('wcanvas');
const context = canvas.getContext("2d");
canvas.width = W_WIDTH;
canvas.height = 500;




window.requestAnimationFrame(step);

let wholeJsonDataFile;
fetch("data.json")
.then((response) => response.json())
.then((json) => {
    wholeJsonDataFile = json;
});
 
 class Line2d
 {
    constructor(start, end)
    {
        this.start = new Vector2(start.x, start.y);
        this.end = new Vector2(end.x, end.y);
    }
    length()
    {
        return Math.sqrt((this.end.x-this.start.x)*(this.end.x-this.start.x)+(this.end.y-this.start.y)*(this.end.y-this.start.y));
    }
    draw(context)
    {
        DrawLineLine(context, this);
    }
    setAngle(rad)
    {
        const length = this.length();
        let x = this.end.x - this.start.x;
        let y = this.end.y - this.start.y;

        if(x >= 0 && y >= 0)
        {
            x = length*Math.cos(rad);
            y = length*Math.sin(rad);
        }
        else if(x >= 0 && y <= 0)
        {
            x = length*Math.cos(rad);
            y = -length*Math.sin(rad);
        }
        else if(x <= 0 && y <= 0)
        {
            x = -length*Math.cos(rad);
            y = -length*Math.sin(rad);
        }
        else if(x <= 0 && y >= 0)
        {
            x = -length*Math.cos(rad);
            y = length*Math.sin(rad);
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
    const length = Math.sqrt(vec.x*vec.x + vec.y*vec.y);
    return new Vector2(vec.x/length, vec.y/length);
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
function DrawWheel(context, WHEEL_CENTER, WHEEL_TOP, list, count, angleMod)
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


function DrawArrow(context, tip, length, angleRad)
{
    context.save();
    let end = new Vector2(length, 0);
    let upperEdge = new Vector2(length/2, length/4);
    let lowerEdge = new Vector2(length/2, -length/4);
    let upperWing= new Line2d(new Vector2(0,0), upperEdge);
    let lowerWing= new Line2d(new Vector2(0,0), lowerEdge);
    let middleLine= new Line2d(new Vector2(length/2,0), end);
    let cross = new Line2d(upperEdge, lowerEdge);
    context.translate(tip.x,tip.y);
    context.rotate(-angleRad);
    DrawLineLine(context, upperWing);
    DrawLineLine(context, lowerWing);
    DrawLineLine(context, middleLine);
    DrawLineLine(context, cross);
    context.restore();
}

let maxSpeed = 0;
let spinDuration = maxSpeed;

function SpinWheel(speed, maxSpeed, dt)
{
    if(speed < maxSpeed && speedGoesUp) 
    {
        speed += dt;
    }
    else
    {
        speed -= dt*0.05;
        speedGoesUp = false;
    }
    if(speed <= 0) 
    {
        speed = 0;
        wheelIsGoing = false;
    }
    return speed;
}

function EvaluateSpin(feedArray, angle, length)
{
    let pos = (PI*2 - angle);
    let secAngle = PI*2/length;
    pos = pos / (PI*2 / length);
    pos %= length-1;
    pos = Math.round(pos);
    //my brain is not big enough to solve this other than with this ugly if else statement
    if(angle < secAngle/2) 
    {
        pos = 0;
    }    
    else if(angle > secAngle/2 && angle < secAngle) 
    {
        pos = length - 1;
    }
    return feedArray[pos];
}




function updateDrawing()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    DrawWheel(context, WHEEL_CENTER, WHEEL_TOP, langNameList, langNameList.length, elapsedSpin, 30);
    DrawCircle(context, WHEEL_CENTER.x, WHEEL_CENTER.y, IN_RADIUS);
    DrawCircle(context, WHEEL_CENTER.x, WHEEL_CENTER.y, OUT_RADIUS);
    DrawArrow(context, new Vector2(WHEEL_CENTER.x + OUT_RADIUS, WHEEL_CENTER.y), 50, 0);
}
let languageList;
let challengeList;
let frameworkList;
let langNameList = [];
let challengeNameList = [];
let frameworkNameList = [];
let dataUploaded = false;
function getDatafromJSON()
{
    if(!dataUploaded)
    {
        if(!wholeJsonDataFile)
        {
            console.log("json data not loaded yet");
        }
        else
        {
            languageList = wholeJsonDataFile.languages;
            challengeList = wholeJsonDataFile.challenges;
            frameworkList = wholeJsonDataFile.frameworks;
            //here i think i need async??
            for(let i = 0; i< languageList.length; i++)
            {
                langNameList[i] = (String(languageList[i].name));
                challengeNameList[i] = (String(languageList[i].name));
                frameworkNameList[i] = (String(languageList[i].name));
            } 
            console.log("json file succesfully loaded");
            dataUploaded = true;
        }
    }
}

let speed = 0; //1 speed = 1 degree per second
let elapsedSpin = 0;
let speedGoesUp = false;
let loopCount = 0;


function calculateSpin()
{
    speed = SpinWheel(speed, maxSpeed, dt);
    elapsedSpin += speed;
    elapsedSpin %= Math.PI*2;
    let target = EvaluateSpin(langNameList, elapsedSpin, langNameList.length);
    console.log(target); //TODO should it be guarded for not loaded data?
    loopCount++;
    //TODO get all possible elements
    //TODO add list of options with
    
}



let checkboxes = [];
let checkboxIsInitialized = false;
let chosenList = [];
/*
<div id="checkbox-container">
                <div><input type="checkbox"><span>checkbox1</span></div>
                <div><input type="checkbox"><span>checkbox2</span></div>
                <div><input type="checkbox"><span>checkbox2</span></div>
                </div>
                */
function createCheckboxes(labels) {
    if (!checkboxIsInitialized) {
        
        labels.forEach((labelText, index) => 
        {
            const container = document.getElementById("checkbox-container");
            const checkboxItem = document.createElement("div");
            checkboxItem.classList.add("checkbox-item"); 
            
            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `checkbox${index}`;
            checkbox.value = "checkbox";
            checkbox.checked = true;
            checkboxes.push(checkbox);
            
            const label = document.createElement("label");
            label.htmlFor = `checkbox${index}`;
            label.textContent = labelText;
            label.classList.add("checkbox-text"); 
            checkboxItem.appendChild(checkbox);
            checkboxItem.appendChild(label);
            container.appendChild(checkboxItem); 
        });
        
        checkboxIsInitialized = true;
    }
}
//event listener to update checkboxes

/*
<h2>Options</h2>
<div class="options-container">
    <div id="select-container">
        <label>Choose what to spin:</label>
        <select id="opt-list" name="opt-list">
            <option value="something">something</option>
            <option value="aaa">bbbb</option>
            <option value="aaa">cccc</option>
        </select>
    </div>
*/

let selectList = [];

let selectIsInitialized = false;
function createSelect(options)
{
    if (!selectIsInitialized) 
    {
        const container = document.getElementById("opt-list");
        options.forEach((optionText, index) => 
        {
            const selectItem = document.createElement("div");
            selectItem.classList.add("select-item"); 
            const option = document.createElement("option");
            option.value = `select${index}`;
            option.text = optionText;
            
            selectList.push(option);
            container.appendChild(option);
            selectIsInitialized = true;
        });
    }
}
//EVENTS===============================================================



function addCheckboxListeners() {
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("click", function()
        {
            if (checkboxes[index].checked) {
                console.log(`Checkbox ${index} is checked.`);
              } else {
                console.log(`Checkbox ${index} is unchecked.`);
              }
        });
    });
}
function addSelectChangeListener() 
{
    const container = document.getElementById("opt-list");
        container.addEventListener("change", function()
        {
            const selectedOption = container.options[container.selectedIndex];
            console.log(`Selected option: ${selectedOption.text}`);
        });
};



const startSpin = document.getElementById("start-spin");
startSpin.addEventListener("click", function()
{
    wheelIsGoing = true;
    maxSpeed = (Math.random()/4 + 0.2); 
    speedGoesUp = true;
});

//MAIN LOOP============================================================

let start;
let timestamp = Date.now();
let dt = 0;

function step(timestamp)
{
    if(start === undefined)
    {
        start = timestamp;
    }
    dt = (timestamp - start)/1000;
    start = timestamp;
    //LOGIC
    updateDrawing();
    getDatafromJSON();
    calculateSpin();
    addCheckboxListeners();
    addSelectChangeListener();
    if(dataUploaded) createCheckboxes(langNameList);
    if(dataUploaded) createSelect(langNameList);
    //LOGIC
    return;
    window.requestAnimationFrame(step);
}


//TODO calculateSpin only when i click on the button



console.log("===FINISH===");
    