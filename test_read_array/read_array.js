// read array test
var x = document.getElementById("what");
x.innerHTML = array;


var anchor = "graph";
var dim = 30;
var step;
var qx = [parseFloat(-1.0)];
var qy = [parseFloat(-1.0)];
var data = [];
var max_iq = dim * parseFloat(10);
var options = {};

step = parseFloat(2) / dim;
for (var i = 0; i < dim-1; i++){
	qx.push(qx[i] + step);
	qy.push(qy[i] + step);
}

//console.log(qx.length);
//console.log(qx);
//console.log(qy.length);
//console.log(qy);

for (var i = 0; i < qx.length; i++){
    data.push([]);
    for (var j = 0; j < qy.length; j++){
        data[i].push([]);
        data[i][j] = Math.random() * (qx.length-i) * parseFloat(10);
    }
}

// random data
x = document.getElementById("check");
x.innerHTML = qx + qy + data;
