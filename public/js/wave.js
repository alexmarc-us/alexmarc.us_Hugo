var shoreline = new Array();
var waves = new Array();
var canWidth = 550;
var canHeight = 400;
var waveNum = 0;
var count = 0;
var frequency = 25;
var interval = null;


function wave(graph) {
	if(interval != null){
		clearInterval(interval);
		interval = null;
	}
	setupShore(graph);
	createWave();
	if(graph != -1) {
		interval = setInterval("update();", 50);
	}
}


function update(ctx) {
	if(waves.length != 0) {
		if(count%frequency == 0){
			createWave();
		}
		var canvas = document.getElementById("wave-canvas");
		canvas.setAttribute("width",canWidth);
		canvas.setAttribute("height",canHeight);
		var ctx = canvas.getContext("2d");
		drawWater(ctx);
		drawShore(ctx);
		drawWaves(ctx);
		updateWaves();
		////updateInfo();
		count++;
	}
}

function drawElement(ctx, x, y, width, height, fillcolor) {
	ctx.fillStyle = fillcolor;
	ctx.fillRect(x, y, width, height);
}


function setupShore(graph) {
	for(var i = 0; i <= canWidth/5; i++) {
		switch(graph){
			case 0:
				shoreline[i] = Math.round(canHeight/5);  // Flat shoreline
				break
			case 1:
				shoreline[i] = Math.round(canHeight/5) + Math.floor(Math.random()*151);  // Random shoreline
				break
			case 2:
				shoreline[i] = i*2.5; // Diagonal shoreline
				break
			case 3:
				shoreline[i] = Math.cos(i*5)*50 + 150; // Cosine, loose
				break
			case 4:
				shoreline[i] = Math.cos(i*50)*100 + 110; // Cosine, tight
				break
			case 5:
				shoreline[i] = Math.cos(i*100000)*100 + 110; // Cosine, loose/tight
				break
			case 6:
				shoreline[i] = Math.pow(i, 2)/40 +20; // Exponential
				break
			case 7:
				shoreline[i] = Math.sin((i*50)/2)*15 +100;
				break
		}
	}
}


function createWave() {
	/*	Wave array setup:
		[ [waveID1, [[status, ypos], [status, ypos]], 
		[waveID2, [[status, ypos], [status, ypos]] ] 
		Status possibilities:
		* 	1 = roller, #000066, 20px high, moves forward 5 px
		* 	2 = rising wave (far), #000099, 15px high, moves forward 5 px
		* 	3 = rising wave (close), #0000CC, 10px high, moves forward 5px 
		* 	4 = cresting wave, #0000FF back 3 #CCFFCC front 3, 6px high, moves forward 3px
		* 	5 = breaking wave, #0000FF back 2 #CCFFCC front 3, 5px high, moves forward 1px
		* 	6 = broken wave, #CCFFCC, 4px high, extends forward 1px until 8px high
		*	0 = killed wave node, no display*/
	waves.push([waveNum,[]]);
	for(var c = 0; c <= canWidth/5; c++){
		waves[waves.length-1][1].push([1, canHeight-5]);
	}
	waveNum = waveNum + 1;
}

function destroyWave() {
	waves.shift();
}

function drawWater(ctx) {
	drawElement(ctx, 0, 0, canWidth, canHeight, "#336699");
}

function drawShore(ctx) {
	for(var s = 0; s < shoreline.length; s++) {
		drawElement(ctx, s*5, 0, 5, shoreline[s], "#FFCC00");
	}
}


function updateWaves() {
	// Update wave node statuses based on location
	for(var u = 0; u < waves.length; u++) {
		var nodes = waves[u][1].length;
		for(var v = 0; v < nodes; v++){
			var distance = waves[u][1][v][1] - shoreline[v];
			if(distance > 260) {
				waves[u][1][v][0] = 1;
			} else if (distance <= 260 && distance > 160) {
				waves[u][1][v][0] = 2;
			} else if (distance <= 160 && distance > 40) {
				waves[u][1][v][0] = 3;
			} else if (distance <= 40 && distance > 20) {
				waves[u][1][v][0] = 4;
			} else if (distance <= 20 && distance > 10) {
				waves[u][1][v][0] = 5;
			} else if (distance <= 10 && distance > 0) {
				waves[u][1][v][0] = 6;
			} else {
				waves[u][1][v][0] = 0;
			}
		}
	}
	// Update wave node positions
	for(var u = 0; u < waves.length; u++) {
		var nodes = waves[u][1].length;
		for(var v = 0; v < nodes; v++){
			var status = waves[u][1][v][0];
			switch (status) {
				case 0:
					break
				case 1:
					var temp = waves[u][1][v][1] - 5;
					waves[u][1][v][1] = temp;
					break
				case 2:
					var temp = waves[u][1][v][1] - 5;
					waves[u][1][v][1] = temp;
					break
				case 3:
					var temp = waves[u][1][v][1] - 5;
					waves[u][1][v][1] = temp;
					break
				case 4:
					var temp = waves[u][1][v][1] - 3;
					waves[u][1][v][1] = temp;
					break
				case 5:
					var temp = waves[u][1][v][1] - 1;
					waves[u][1][v][1] = temp;
					break
				case 6:
					var temp = waves[u][1][v][1] - 1;
					waves[u][1][v][1] = temp;
					break
			}
		}
	}
	// Check for waves to be destroyed
	for(var u = 0; u < waves.length; u++) {
		var nodes = waves[u][1].length;
		var destroy = true;
		for(var v = 0; v < nodes; v++){
			if(waves[u][1][v][0] != 0) {
				destroy = false;
			}
		}
		if(destroy == true) {
			destroyWave();
		}
	}
}	

function drawWaves(ctx) {
	for(var w = 0; w < waves.length; w++) {
		for(var n = 0; n < waves[w][1].length; n++) {
			var status = waves[w][1][n][0];
			var y = waves[w][1][n][1];
			switch (status) {
				case 0:
					break
				case 1:
					drawElement(ctx, n*5, y, 5, 40, "#003366");
					break
				case 2:
					drawElement(ctx, n*5, y, 5, 35, "#003366");
					break
				case 3:
					drawElement(ctx, n*5, y, 5, 30, "#003366");
					break
				case 4:
					drawElement(ctx, n*5, y, 5, 25, "#003366");
					break
				case 5:
					drawElement(ctx, n*5, y, 5, 10, "#CCFFCC");
					drawElement(ctx, n*5, y+10, 5, 10, "#003366");
					break
				case 6:
					drawElement(ctx, n*5, y, 5, 15, "#CCFFCC");
					break
			}
		}
	}	
}


//function updateInfo() {
	//var info = document.getElementById("info");
	//var newinfo = "";
	//for(var i = 0; i < waves.length; i++){
		//newinfo += "Wave" + waves[i][0] + ": " + waves[i][1].length + " nodes<br />";
		//newinfo += "Wave[node] - shoreline[node]: <br />";
		//newinfo += "<span id=\"infotext\">";
		//for(var j = 0; j < waves[i][1].length; j++){
			//newinfo += "[" + waves[i][1][j][0] + "," + (waves[i][1][j][1] - shoreline[j]) + "], ";
		//}
		//newinfo += "</span>";
		//newinfo += "<br />";
	//}
	//info.innerHTML=newinfo;
//}
