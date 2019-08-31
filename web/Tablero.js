/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.addEventListener("click", defineImage, false);

//variable para saber si está pintando localmente
var islocaldrawing = true;
canvas.addEventListener("mouseup", end,false);
canvas.addEventListener("mouseout", end,false);

canvas.addEventListener("mousedown", function(evt){
    islocaldrawing = true;
    beginDraw (evt);
}, false);

function beginDraw (evt){
    if (evt == null) islocaldrawing = false;
    
    context.beginPath();
    
    if (islocaldrawing){
        canvas.addEventListener("mousemove", drawImage,false);
        sendData(evt, "beginDraw");
    }
}

function drawImage (evt, currentCoords){
    var coords;
    if (islocaldrawing) coords = getCoords(evt.clientX, evt.clientY);
    else coords = getCoords(currentCoords.x, currentCoords.y);
    context.lineTo(coords.x, coords.y);
    context.stroke();
    
    if (islocaldrawing){
        sendData(evt, "drawImage");
        
        
    }
    
}

function end (evt){
    if (islocaldrawing){
       canvas.removeEventListener("mousemove", drawImage, false);
       sendData(evt, "beginDraw");
      
    }
}

function sendData(evt, methodName){
   websocket.send(JSON.stringify(
           
            {
                coords: {
                    x: evt.clientX,
                    y: evt.clientY
                },
                methodName: methodName
            }
           
            ));
}

function getCurrentPos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getCoords(clientX, clientY) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function getCurrentPos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


function defineImage(evt) {
    var currentPos = getCurrentPos(evt);

    for (i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
            var color = document.inputForm.color[i];
            break;
        }
    }

    for (i = 0; i < document.inputForm.shape.length; i++) {
        if (document.inputForm.shape[i].checked) {
            var shape = document.inputForm.shape[i];
            break;
        }
    }

    var json = JSON.stringify({
        "shape": shape.value,
        "color": color.value,
        "coords": {
            "x": currentPos.x,
            "y": currentPos.y
        }
    });
    drawImageText(json);
         drawImageText(json);
         sendText(json);
    
}


function drawImageText(image) {
    console.log("drawImageText");
    var json = JSON.parse(image);
    context.fillStyle = json.color;
    switch (json.shape) {
    case "circle":
        context.beginPath();
        context.arc(json.coords.x, json.coords.y, 5, 0, 2 * Math.PI, false);
        context.fill();
        break;
    case "square":
    default:
        context.fillRect(json.coords.x, json.coords.y, 10, 10);
        break;
    }
}