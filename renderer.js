const remote = require('electron').remote;
const window = remote.getCurrentWindow();

const express = require('express');
const app = express();

const progress = document.getElementById('progress');
const counter = document.getElementById('counter');
const timeElapsed = document.getElementById('timeElapsed');
const timeLeft = document.getElementById('timeLeft');

var num = 0;
var max = 0;
var startTime = 0;

document.getElementById('reset').addEventListener('click', (e) => {
    num = 0;
    max = 0;
    startTime = 0;
    progress.innerHTML = '0.00%';
    counter.innerHTML = 'Num: ' + max;
    timeElapsed.innerHTML = '';
    timeLeft.innerHTML = '';
});

document.getElementById('close').addEventListener('click', (e) => {
    window.close();
});

document.getElementById('dev').addEventListener('click', (e) => {
    window.toggleDevTools();
});

function displayTime(currentTime) {
    var totalSeconds = Math.floor(currentTime/1000);
    var seconds = ('0' + totalSeconds % 60).slice(-2);
    var totalMinutes = Math.floor(totalSeconds/60);
    var minutes = ('0' + totalMinutes % 60).slice(-2);
    var totalHours = Math.floor(totalMinutes/60);
    var hours = ('0' + (totalHours) % 24).slice(-2);
    return  hours + ":" + minutes + ":" + seconds;
}

function updateValue() {
    if(max == 0) return;
    const val = ((num / max) * 100).toFixed(2);
    progress.innerHTML = val + '%';
    counter.innerHTML = 'Num: ' + max;
    if(startTime == 0) return;
    var elapsedSeconds = new Date().getTime() - startTime;
    timeElapsed.innerHTML = "Elapsed time: " + displayTime(elapsedSeconds);
    var leftSeconds = (elapsedSeconds / (num / max)) - elapsedSeconds;
    timeLeft.innerHTML = "Time left: " + displayTime(leftSeconds);
}

app.get('/add', function (req, res) {
    var num = req.param('num');
    if(num) {
        max += parseInt(num);
    } else {
        max++;
    }
    updateValue();
    res.send('Done');
})

app.get('/done', function (req, res) {
    if(num == 0) {
        startTime = new Date().getTime();
    }
    num++;
    updateValue();
    res.send('Done');
})

var server = app.listen(1337, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})