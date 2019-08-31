/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var wsUri = "ws://" + "localhost:61465/TableroWS/"+"tableroendpoint";
//var websocket = new WebSocket(wsUri);
var wsUri = "ws://" + document.location.host + document.location.pathname + "tableroendpoint";
var websocket = new WebSocket(wsUri);

websocket.onerror = function(evt) { onError(evt) };

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

var output = document.getElementById("output");
websocket.onopen = function(evt){OnOpen(evt)};

function writeToScreen(message){
    output.innerHTML+=message+"<br>";
}

function OnOpen(evt){
    writeToScreen("Conectado a " + wsUri);
}

websocket.onmessage = function (evt){onMessage(evt)};

function sendText(json){
    websocket.send(json);
}

function onMessage(evt) {
    console.log("received: " + evt.data);
        drawImageText(evt.data);
        var json = JSON.parse(evt.data);
        if (json.methodName =="beginDraw") beginDraw(null);
        if (json.methodName =="drawImage") drawImage(null, json.coords);
}


