const remote = require('electron').remote;
const window = remote.getCurrentWindow();

const express = require('express');
const app = express();

const progress = document.getElementById('progress');
const counter = document.getElementById('counter');

var num = 0;
var max = 0;

document.getElementById('reset').addEventListener('click', (e) => {
    num = 0;
    max = 0;
    progress.innerHTML = '0%';
    counter.innerHTML = '' + max;
});

document.getElementById('close').addEventListener('click', (e) => {
    window.close();
});

document.getElementById('dev').addEventListener('click', (e) => {
    window.toggleDevTools();
});

function updateValue() {
    if(max == 0) return;
    const val = parseInt((num / max) * 100);
    progress.innerHTML = val + '%';
    counter.innerHTML = '' + max;
}

app.get('/add', function (req, res) {
    max++;
    updateValue();
    res.send('Done');
})

app.get('/done', function (req, res) {
    num++;
    updateValue();
    res.send('Done');
})

var server = app.listen(1337, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})