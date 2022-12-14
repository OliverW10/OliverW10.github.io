
if(localStorage.getItem("money") !== null){
	var money = localStorage["money"];
}else{
	var money = 5;
}

function saveMoney(){
	localStorage.money = money;
}

var aimGameSpeed = 1; // to allow for smoothing in and out of slow-mo
var gameSpeed = 1;

var cameraPosAim = [0, 1, -0.4];
var cameraPosAlpha = 0.2; // the amount that cameraPos is shifted towards cameraPosAim every frame
var cameraPos = [0, 0, 0];

var gravity = 0.003;
var balls = [new Ball(0, 1, 1.5), new Ball(0, 1.5, 1), new Ball(-5, 1, 1.5)];
// first one is gameplay ball, second one is show ball for the menu, third one is ghost ball
balls[1].menuReset();

var vingette = 0.2;

var comRacquetController = new AIController(2);
var playerRacquetController = new mouseController();
var tutorialControllers = new AIController(10);

function changeSkill(newSkill){
	comRacquetController.setDifficulty(newSkill);
}

var vanishingPointPos = [0.5, 0.3];
var renderer = new Renderer(0.5);

var graphicsQuality = 1;
var graphicsQualityKey = {0:"low", 1:"normal"}
function generateCourtDirfters(quality){
	renderer.spawnDrifters(courtLinesOuter, "rgb(0, 0, 0)", "outer", 2, quality);
	renderer.spawnDrifters(courtLinesMin, "rgb(0, 0, 0)", "min", 4, quality);
	renderer.spawnDrifters(courtEnemyLines, "rgb(0, 0, 0)", "enemy", 3, quality);
}
generateCourtDirfters(50);

var menuPosAngle = 0;
var menuTextOffsetAngle = 0;
var menuTextOffset = [0, 0];

var menuPlayButton = new TextButton([0.25, 0.4, 0.5, 0.3], "Play");
var menuFade = 1;

var accPoints = 0

var score = [0, 0];
var scoreLegend = {0:"0", 1:"1", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7"};

var flashTextText = "Blue Test";
var flashTextTrans = 0;
var flashTextColour = [0, 0, 255];

function flashText(text, colour = [0, 0, 0], time = 1){
	flashTextText = text;
	flashTextColour = colour;
	flashTextTrans = Math.min(time, 1);
}

var transitionProgress = 2;
function transition(callback){
	transitionProgress = 0;
	transitionCallback = callback;
	saveMoney()
}

var lastMouseButtons = [false, false, false]; // what the state of mouse buttons was last frame

var knockoutRatios = [2, 1.4, 0.9, 0.1, 0, 0, 0, 0, 0]; // goes [winner, runner up, semis, quartars, below]
function generateCompName(difficult = 4){
	return compNames[0][round(random(0, compNames[0].length-1))] +" "+ compNames[1][round(random(0, compNames[1].length-1))] +" "+ compNames[2][round(random(0, compNames[2].length-1))];
}

function getRobbinPlayers(n){
	return clip(random(n**0.3*2, n**0.4*2+2), 4, 32)
}
function getKnockoutPlayers(n){
	return 2**clip(round(random(n**0.15+1, n**0.25+2)), 3, 6)
}

function generateComp(currentMoney = false, type = false){
	if(currentMoney === false){
		this.cost = money;
	}else{
		this.cost = currentMoney;
	}
	this.price = clip(round(random(this.cost/5, this.cost*1.5)), 1, 9999);
	this.difficulty = random(this.price**0.6, this.price**0.7);
	this.buttonNum = round(random(0, compButtonPositions.length-1));
	this.buttonPos = compButtonPositions[this.buttonNum];
	while(this.buttonPos[4] === true){
		this.buttonNum = round(random(0, compButtonPositions.length-1));
		this.buttonPos = compButtonPositions[this.buttonNum];
	}
	compButtonPositions[this.buttonNum][4] = true;
	if(type === false){
		if(random(0, 1) > 0.5){
			this.type = "knockout";
		}else{
			this.type = "robbin";
		}
	}else{
		this.type = type;
	}
	if(this.type === "knockout"){
		this.players = getKnockoutPlayers(currentMoney);
		this.icon = drawKnockoutIcon;
		comps.push([new KnockoutCompetition(this.players, this.difficulty, this.price),
			new CompButton(this.buttonPos, generateCompName(), this.icon, this.price)])
	}
	if(this.type === "robbin"){
		this.players = getRobbinPlayers(currentMoney);
		this.icon = drawRobbinIcon;
		comps.push([new RobbinCompetition(this.players, this.difficulty, this.price),
			new CompButton(this.buttonPos, generateCompName(), this.icon, this.price)])
	}
}

function deleteComp(num){
	/*
	deletes the comp with the given index in the comps array
	*/
	compButtonPositions[compButtonPositions.indexOf(comps[num][1].rect)][4] = false; // set the position as avaliable
	comps.splice(num, 1); // deletes button
	generateComp(); // generates new one
}

var compButtonPositions = [
[0.02, 0.1, 0.46, 0.14, true],
[0.02, 0.25, 0.46, 0.14, false],
[0.02, 0.4, 0.46, 0.14, false],
[0.02, 0.55, 0.46, 0.14, false],
[0.52, 0.1, 0.46, 0.14, false],
[0.52, 0.25, 0.46, 0.14, false],
[0.52, 0.4, 0.46, 0.14, false],
[0.52, 0.55, 0.46, 0.14, false]
]
var currentButtons = [];
var compNames = [["Newcomers", "Beginers", "Clubs", "State", "National", "International", "Galactic"],
["Tennis", "Open", "Invitational", ""],
["Tournament", "Competition", ""]]
var comps = [[new TutorialCompetition(), new TextButton(compButtonPositions[0], "Tutorial")]]
for(var i = 0; i < 3; i +=1){
	generateComp(money, "robbin");
	generateComp(money, "knockout");
}
generateComp(5, "robbin");

var onlineButton = new TextButton([0.01, 0.72, 0.98, 0.2], "Online leaderboard");

var settingsButton = new BothButton([0.01, 0.94, 0.48, 0.05], "Settings", drawSettingsIcon);
var helpButton = new TextButton([0.51, 0.94, 0.48, 0.05], "What should this button be?");

var robbinBlur = 0;
var knockoutBlur = 0;

var lastSpace = false;
var lastMousePos = {"x":0, "y":0};

var tutorialShotsIn = 0;
var wallController = new WallController(8);

var birds = [];
for(var i = 0; i < 25; i += 1){
	birds.push(new Bird(random(-10, 10), random(5, 7), random(5, 25)));
}

var pagesTutorials = new Tutorial();
var paidComp = false;

var backButton = new IconButton([0.05, 0.05, 0.1, 0.1], drawPrevIcon);

var leaderboardPerPage = 10; // how many items per page
var leaderboardPage = 0; // what page you are on
var leaderboardSubmitButton = new TextButton([0.3, 0.875, 0.4, 0.1], "Submit Score");
var leaderboardNextButton = new IconButton([0.89, 0.89, 0.1, 0.1], drawNextIcon);
var leaderboardPrevButton = new IconButton([0.01, 0.89, 0.1, 0.1], drawPrevIcon);

var gameSpeedAlpha = 0.3;
var slowGameSpeed = 0.05;

var resetButton = new TextButton([0.1, 0.9, 0.15, 0.05], "Reset Save");
var qualityButton = new TextButton([0.1, 0.2, 0.25, 0.1], "Quality");

var menuBackgroundProgress = 0;
var menuBackgroundOverlay = 0;
var menuBackgroundOverlayAim = 0;

class Game{
	constructor(){
		this.state = this.menu;
		this.tutorialStage = 0;
		this.currentComp = false;
		this.currentCompNum = undefined;
		this.justDeleted = undefined;
	}

	execute(){
		c.beginPath();
		c.fillStyle = "rgb(255, 255, 255)";
		c.fillRect(0, 0, canvas.width, canvas.height);
		this.state();
		lastMousePos = {"x":mousePos.x, "y":mousePos.y};
	}

	menu(){
		/*
		main menu with the play button
		*/
		cameraPos = [0, 2.5, 0];
		menuBackgroundOverlayAim = 0;
		if(welcomeSound.played === 0){
			welcomeSound.play()
		}
		// c.fillStyle = "rgb(200, 200, 200)";
		// c.fillRect(0, 0, canvas.width, canvas.height);

		if(menuPlayButton.state != 0){
			aimGameSpeed = 0.01;
		}else{
			aimGameSpeed = 1;
		}
		gameSpeed = aimGameSpeed*gameSpeedAlpha + gameSpeed*(1-gameSpeedAlpha);
		if(menuPlayButton.update() === true){
			score = [0, 0];
			this.state = this.pickComp;
			// transition(this.pickComp);
			cameraPosAim = [0, 1, -0.4];
			return true;
		}
		menuTextOffsetAngle = Math.atan2(mousePos.y-canvas.height*0.15, mousePos.x-canvas.width/2);
		menuTextOffset = [Math.cos(menuTextOffsetAngle)*canvas.width*0.003, Math.sin(menuTextOffsetAngle)*canvas.width*0.003];
		showText("T??nn??s", canvas.width/2, canvas.height*0.15, canvas.width*0.1, "rgba(0, 0, 0, 1)", true, true);
		showText("T??nn??s", canvas.width/2+menuTextOffset[0], canvas.height*0.15+menuTextOffset[1], canvas.width*0.1, "rgba(255, 255, 255, 1)", true, true);

		menuPlayButton.draw();

		balls[1].menuRun();
		balls[1].draw();
		this.overlay();
	}

	comp(){
		menuBackgroundOverlayAim = 0;
		if(this.currentComp.update() === true){ // going into match
			score = [0, 0];
			aimGameSpeed = 1;
			changeSkill(this.currentComp.getSkill())
			if(this.currentComp.type === "tutorial"){
				console.log(this.currentComp.selected);
				if(this.currentComp.selected === 0){
					transition(this.tutorial);
				}
				if(this.currentComp.selected === 1){
					transition(this.tournTutorial);
					pagesTutorials.state = "tournaments";
					pagesTutorials.page = 0;
				}
				if(this.currentComp.selected === 2){
					transition(this.tips);
					pagesTutorials.state = "tips";
					pagesTutorials.page = 0;
				}
				if(this.currentComp.selected === 3){
					transition(this.wall);
				}
			}else{
				// this.state = this.match;
				transition(this.match);
			}
		}

		if(this.currentComp.stillGoing === false && paidComp === false){ // comp has finished
			money += this.currentComp.getWinnings();
			transition(this.pickComp);
			comps[this.currentCompNum][1].fadeOut(function(){deleteComp(main.currentCompNum)});
			paidComp = true;
		}

		if(backButton.update() === true){ // removed beacuse it uses the money but dosent make any
			transition(this.pickComp);
		}
		backButton.draw();
		this.overlay();
		this.showMoney();
	}

	pickComp(){
		menuBackgroundOverlayAim = 0;
		this.menuBackground()
		hideTextBox()
		showText("Select Mode", canvas.width/2, canvas.height*0.075, canvas.height*0.08, "rgb(0, 0, 0)", true);
		for(var i = 0; i<comps.length; i += 1){
			if(comps[i][1].update() === true){
				if(money >= comps[i][0].price){
					console.log("into comp")
					this.currentComp = comps[i][0];
					this.currentCompNum = i;
					transition(this.comp);
					money -= comps[i][0].price;
					paidComp = false;
				}else{
					comps[i][1].shake();
				}
			}
			if(comps[i][1].toGo === true){
				main.justDeleted = i;
				comps[i][1].fadeOut(function(){deleteComp(main.justDeleted)})
			}
		}
		if(onlineButton.update() === true){
			transition(this.leaderboard);
			getScores();
		}
		if(helpButton.update() === true){
		}
		if(settingsButton.update() === true){
			transition(this.settings)
		}
		onlineButton.draw();
		for(var i = 0; i<comps.length; i += 1){
			comps[i][1].draw();
		}

		settingsButton.draw();
		helpButton.draw();
		this.overlay();
		this.showMoney();
	}

	tips(){
		if(pagesTutorials.done() === true){
			this.state = this.comp;
			this.currentComp.complete[2] = true;
		}
		pagesTutorials.draw();
		this.overlay();
	}

	tournTutorial(){
		if(pagesTutorials.done() === true){
			this.state = this.comp;
			this.currentComp.complete[1] = true;
		}
		pagesTutorials.draw();
		this.overlay();
	}

	tutorial(){
		if(balls[0].stopped === false){ // if you arent grabbing the ball tries to frame the ball
			cameraPosAim = [-balls[0].X, 1, -0.4];
		}
		FOV = scaleNumber(balls[0].Z, 1, 3, 1.3, 0.9);

		cameraPos[0] = cameraPosAim[0]*cameraPosAlpha + cameraPos[0]*(1 - cameraPosAlpha);
		cameraPos[1] = cameraPosAim[1]*cameraPosAlpha + cameraPos[1]*(1 - cameraPosAlpha);
		cameraPos[2] = cameraPosAim[2]*cameraPosAlpha + cameraPos[2]*(1 - cameraPosAlpha);

		if(this.tutorialStage !== 2){
			playerRacquetController.update();
		}

		this.background();
		this.drawReflections();
		// balls[0].tutorialRun(this.tutorialStage);
		if(this.tutorialStage < 2){
			balls[0].run(true);
		}else if(this.tutorialStage === 2){
			balls[0].run(2);
		}else{
			balls[0].run(false);
		}
		if(this.tutorialStage >= 2){
			wallController.update();
		}
		if(this.tutorialStage === 1){
			renderer.drawDrifters("enemy");
		}
		if(this.tutorialStage >= 2){
			renderer.drawDrifters("outer");
			renderer.drawDrifters("min");
		}
		if(balls[0].Z > 2){
			balls[0].draw();
		}
		if(this.tutorialStage >= 2){
			renderer.drawPoints(netOutlinePoints, cameraPos, "rgb(0, 0, 0)", 10);
			renderer.drawPoints(netOutlinePoints, cameraPos, "rgb(255, 255, 255)", 5);
		}
		playerRacquetController.draw();
		if(balls[0].Z <= 2){
			balls[0].draw();
		}

		if(checkKey("Space") === true && lastSpace === false){
			
			if(aimGameSpeed === 1){ 
				aimGameSpeed = slowGameSpeed;
			}else{
				aimGameSpeed = 1;
			}
		}
		lastSpace = checkKey("Space");
		gameSpeed = aimGameSpeed*gameSpeedAlpha + gameSpeed*(1-gameSpeedAlpha);

		if(this.tutorialStage === 0){
			aimGameSpeed = 0.1;
			showText("Hold click on the ball to drag it", canvas.width*0.5, canvas.height*0.7, canvas.width*0.03);
			if(playerRacquetController.dragging === true){
				this.tutorialStage += 1;
			}
		}
		if(this.tutorialStage === 1){
			showText("'Throw' The ball moving the mouse upwards and releasing. Try to get 3 shots in", canvas.width*0.5, canvas.height*0.37, canvas.height*0.03);
			showText("Tip: Releasing the ball further back will result is a lower shot", canvas.width*0.5, canvas.height*0.8, canvas.width*0.02);
			showText(tutorialShotsIn, canvas.width*0.5, canvas.height*0.1, canvas.width*0.03);
			drawArrow(canvas.width*0.5, canvas.height*0.6, canvas.width*0.5, canvas.height*0.8, canvas.width*0.05)
			if(tutorialShotsIn >= 3){
				this.tutorialStage += 1;
				changeSkill(15);
				aimGameSpeed = 1;
			}
		}
		if(this.tutorialStage === 2){
			showText("Tap space for slow-mo", canvas.width*0.5, canvas.height*0.8, canvas.width*0.04);
			drawSpacebar(canvas.width*0.3, canvas.height*0.85, canvas.width*0.4);
			if(aimGameSpeed < 0.5){
				this.tutorialStage += 1;
			}
		}
		if(this.tutorialStage === 3){
			showText("Have a 5 shot rally", canvas.width*0.5, canvas.height*0.9, canvas.width*0.04);
			showText(balls[0].rally, canvas.width*0.5, canvas.height*0.1, canvas.width*0.03);
			if(balls[0].rally > 5){
				this.tutorialStage += 1;
			}
		}
		if(this.tutorialStage === 4){
			flashText("Done", [0, 100, 200]);
			this.state = this.comp;
			this.currentComp.complete[0] = true;
		}
		this.overlay();
	}

	match(){
		// camera movement
		if(balls[0].stopped === false){ // if you arent grabbing the ball tries to frame the ball
			cameraPosAim = [-balls[0].X, 1, -0.4]
		}
		FOV = scaleNumber(balls[0].Z, 1, 3, 1.3, 0.9);

		cameraPos[0] = cameraPosAim[0]*cameraPosAlpha + cameraPos[0]*(1 - cameraPosAlpha);
		cameraPos[1] = cameraPosAim[1]*cameraPosAlpha + cameraPos[1]*(1 - cameraPosAlpha);
		cameraPos[2] = cameraPosAim[2]*cameraPosAlpha + cameraPos[2]*(1 - cameraPosAlpha);

		if(playerRacquetController.update() === true){ // whenever it hits the ball
			comRacquetController.speedUp();
		}
		comRacquetController.update();

		// drawing
		this.background();
		this.drawReflections();
		this.draw();

		// scoring
		showText("You", canvas.width*0.45, canvas.height*0.05, canvas.height*0.03, "rgb(0, 0, 200)", false, false);
		showText("Lvl."+round(comRacquetController.difficulty)+" AI", canvas.width*0.55, canvas.height*0.05, canvas.height*0.03, "rgb(100, 0, 0)", false, false);
		drawGlow(canvas.width*0.55, canvas.height*0.04, canvas.height*0.05, 0.15, [150, 50, 50]);
		drawGlow(canvas.width*0.45, canvas.height*0.04, canvas.height*0.05, 0.15, [50, 50, 150]);
		showText(scoreLegend[score[0]]+" - "+scoreLegend[score[1]], canvas.width/2, canvas.height*0.1, 40, "rgb(0, 0, 0)", true, true);

		if(score[0] === 4 && score[1] === 4){
			score[0] = 3;
			score[1] = 3;
		}
		if((score[0] >= 4 && score[0] > score[1]+1)||
			score[1] >= 4 && score[1] > score[0]+1){
			this.currentComp.score(score);
			this.state = this.comp;

			if(score[0] > score[1]){
				flashText("Victory", [0, 100, 200], 2);
			}else{
				flashText("Enemy wins", [255, 50, 0], 1.5);
			}
		}
		if(checkKey("Space") === true && lastSpace === false){
			downSound.play(true);
			if(aimGameSpeed === 1){ 
				aimGameSpeed = slowGameSpeed;
			}else{
				aimGameSpeed = 1;
			}
		}
		// if(checkKey("Escape") || checkKey("KeyP")){
		// 	transition(this.comp);
		// }
		lastSpace = checkKey("Space");
		gameSpeed = aimGameSpeed*gameSpeedAlpha + gameSpeed*(1-gameSpeedAlpha);
		this.overlay();
	}
	accuracy(){
		// camera movement
		if(balls[0].stopped === false){ // if you arent grabbing the ball tries to frame the ball
			cameraPosAim = [-balls[0].X, 1, -0.4]
		}
		FOV = scaleNumber(balls[0].Z, 1, 3, 1.3, 0.9);

		cameraPos[0] = cameraPosAim[0]*cameraPosAlpha + cameraPos[0]*(1 - cameraPosAlpha);
		cameraPos[1] = cameraPosAim[1]*cameraPosAlpha + cameraPos[1]*(1 - cameraPosAlpha);
		cameraPos[2] = cameraPosAim[2]*cameraPosAlpha + cameraPos[2]*(1 - cameraPosAlpha);

		if(playerRacquetController.update() === true){ // whenever it hits the ball
			comRacquetController.speedUp();
		}
		comRacquetController.update();

		// drawing
		this.background();
		this.drawReflections();
		this.draw();

		showText("Points: "+accPoints, canvas.width/2, canvas.height*0.1, 40, "rgb(0, 0, 0)", true, true);

		// if(ball)
	}
	wall(){
		if(balls[0].stopped === false){ // if you arent grabbing the ball tries to frame the ball
			cameraPosAim = [-balls[0].X, 1, -0.4];
		}
		FOV = scaleNumber(balls[0].Z, 1, 3, 1.3, 0.9);

		cameraPos[0] = cameraPosAim[0]*cameraPosAlpha + cameraPos[0]*(1 - cameraPosAlpha);
		cameraPos[1] = cameraPosAim[1]*cameraPosAlpha + cameraPos[1]*(1 - cameraPosAlpha);
		cameraPos[2] = cameraPosAim[2]*cameraPosAlpha + cameraPos[2]*(1 - cameraPosAlpha);

		playerRacquetController.update()
		wallController.update();
		this.background();
		this.drawReflections(true);
		this.draw(true);

		if(checkKey("Space") === true && lastSpace === false){
			downSound.play(true);
			if(aimGameSpeed === 1){ 
				aimGameSpeed = slowGameSpeed;
			}else{
				aimGameSpeed = 1;
			}
		}
		lastSpace = checkKey("Space");
		gameSpeed = aimGameSpeed*gameSpeedAlpha + gameSpeed*(1-gameSpeedAlpha);
		this.overlay();
	}

	drawReflections(noRacquet = false){
		for(var range = mountainReflectionPoints.length-1; range > 0; range-=1){
			renderer.polygon(mountainReflectionPoints[range], false, true);
			var grd = c.createRadialGradient(canvas.width/2, canvas.height*0.3, 50, canvas.width/2 , canvas.height*0.3,300)
			var dark = range**1.6*15-50;
			var light = range**1.6*15+50;
			grd.addColorStop(0, "rgba("+dark+", "+dark+", "+dark+", 1)");
			grd.addColorStop(1, "rgba("+light+", "+light+", "+light+", 1)");
			c.fillStyle = "rgba("+dark+", "+dark+", "+dark+", 1)";
			c.fill();
		}

		if(graphicsQuality >= 1){
			for(var b in birds){
				birds[b].drawReflection();
			}
		}

		if(noRacquet === false){
			comRacquetController.drawReflection();
		}
		if(this.state === this.tutorial && this.tutorialStage >= 2){
			renderer.drawPoints(netOutlinePointsReflection, cameraPos, "rgba(0, 0, 0, 1)", 10);
			renderer.drawPoints(netOutlinePointsReflection, cameraPos, "rgba(255, 255, 255, 1)", 5);
		}

		var horizonPoint = projectPoint(0, 0, 11);
		c.beginPath();
		var grd = c.createRadialGradient(canvas.width/2, canvas.height*vanishingPointPos[1], 1, canvas.width/2, canvas.height*vanishingPointPos[1], canvas.width/2);
		grd.addColorStop(1, "rgba(150, 150, 150, 0.7");
		grd.addColorStop(0, "rgba(250, 250, 250, 0.7)");
		c.fillStyle = grd;
		c.rect(0, horizonPoint[1], canvas.width, canvas.height);
		c.fill();
	}

	draw(noRacquet = false){
		if(graphicsQuality >= 1){
			for(var b in birds){
				birds[b].update();
			}
		}
		balls[0].run();
		if(noRacquet === false){
			comRacquetController.draw();
		}
		c.fillStyle = "rgb(0, 0, 0)";
		renderer.drawDrifters("min");
		renderer.drawDrifters("outer");
		if(balls[0].Z > 2){
			balls[0].draw();
		}

		renderer.drawPoints(netOutlinePoints, cameraPos, "rgb(0, 0, 0)", 10);
		renderer.drawPoints(netOutlinePoints, cameraPos, "rgb(255, 255, 255)", 5);
		playerRacquetController.draw();
		if(balls[0].Z <= 2){
			balls[0].draw();
		}
	}

	background(){
		var horizonPoint = projectPoint(0, 0, 11);
		// sky
		c.beginPath();
		var grd = c.createRadialGradient(canvas.width/2, canvas.height*vanishingPointPos[1], 1, canvas.width/2, canvas.height*vanishingPointPos[1], canvas.width/2);
		grd.addColorStop(1, colours.ground);
		grd.addColorStop(0, colours.sky);
		c.fillStyle = grd;
		c.rect(0, 0, canvas.width, horizonPoint[1]);
		c.fill();

		for(var range = mountainReflectionPoints.length-1; range > 0; range-=1){
			renderer.polygon(mountainPoints[range], false, true);
			var grd = c.createRadialGradient(canvas.width/2, canvas.height*0.3, 50, canvas.width/2 , canvas.height*0.3,300)
			var dark = range**1.6*15-10;
			var light = range**1.6*15+100;
			grd.addColorStop(0, "rgba("+dark+", "+dark+", "+dark+", 1)");
			grd.addColorStop(1, "rgba("+light+", "+light+", "+light+", 1)");
			c.fillStyle = "rgba("+dark+", "+dark+", "+dark+", 1)";
			c.fill();
		}

	}

	overlay(){ // flash and vingette
		if(flashTextTrans > 0){
			flashTextTrans -= 0.0075;
			showText(flashTextText, canvas.width/2, canvas.height/2, canvas.height*0.1, "rgba("+flashTextColour[0]+", "+flashTextColour[1]+", "+flashTextColour[2]+", "+flashTextTrans+")", true, true);

			c.beginPath();
			c.fillStyle = "rgba("+flashTextColour[0]+", "+flashTextColour[1]+", "+flashTextColour[2]+", "+flashTextTrans*0.1+")";
			c.fillRect(0, 0, canvas.width, canvas.height)
		}

		if(this.state === this.match || this.state === this.tutorial || this.state === this.wall){
			vingette = scaleNumber(gameSpeed, 0, 1, 1, 0.2);
		}else{
			vingette = 0.8;
		}
		var grd = c.createRadialGradient(canvas.width/2, canvas.height/2, 1, canvas.width/2, canvas.height/2, canvas.width);
		grd.addColorStop(0, "rgba(0, 0, 0, 0)");
		grd.addColorStop(1, "rgba(0, 0, 0, "+vingette+")");
		c.fillStyle = grd;
		c.fillRect(0, 0, canvas.width, canvas.height);

		c.beginPath();
		c.fillStyle = "rgb(0, 0, 0)";
		if(transitionProgress > 0 && transitionProgress < 1){
			c.arc(canvas.width*0.5, canvas.height*0.5, (transitionProgress)*canvas.width, 0, Math.PI*2);
		}
		if(transitionProgress > 1 && transitionProgress < 2){
			c.arc(canvas.width*0.5, canvas.height*0.5, (2-transitionProgress)*canvas.width, 0, Math.PI*2);
		}
		c.fill();
		if(transitionProgress < 1 && transitionProgress+0.05 > 1){
			this.state = transitionCallback;
		}
		transitionProgress += 0.05;
	}

	start(){
		c.fillStyle = "rgb(100, 100, 100)";
		c.fillRect(0, 0, canvas.width, canvas.height);

		showText("Click to start", canvas.width/2, canvas.height/2, canvas.height*0.1);
		if(mouseButtons[0] === true){
			lastMouseButtons[0] = true;
		}
		if(mouseButtons[0] === false && lastMouseButtons[0] === true){
			//transition(this.menu);
			this.state = this.menu;
		}
	}

	settings(){
		if(resetButton.update() === true){
			localStorage.clear();
			money = 5;
			flashText("SAVE RESET", [255, 0, 0]);
			for(var i = 0; i < comps.length-1; i ++){
				deleteComp(1);
			}
		}
		resetButton.draw();

		if(qualityButton.update() === true){
			graphicsQuality += 1;
			if(graphicsQuality > 1){
				graphicsQuality = 0;
			}
			console.log(graphicsQuality*30+20);
			generateCourtDirfters(graphicsQuality*30+20);
			flashText(graphicsQualityKey[graphicsQuality]+" Quality", [0, 0, 0]);
		}
		qualityButton.draw();

		if(backButton.update() === true){
			transition(this.pickComp);
		}
		backButton.draw();
		this.overlay();
	}

	leaderboard(){
		showText("Money Leaderboard", canvas.width*0.5, canvas.height*0.1, canvas.height*0.1);
		showText(`Page ${leaderboardPage+1}`, canvas.width*0.9, canvas.height*0.2, canvas.height*0.03);
		showText("Your score: "+money, canvas.width*0.)
		for(var i = 0; i < leaderboardPerPage; i += 1){
			var place = i+leaderboardPage*leaderboardPerPage;
			if(place < sortedLeaderboard.length){
				c.beginPath();
				c.strokeStyle = "rgb(0, 0, 0)";
				c.moveTo(canvas.width*0.1, canvas.height*((i/leaderboardPerPage)*0.9+0.2));
				c.lineTo(canvas.width*0.9, canvas.height*((i/leaderboardPerPage)*0.9+0.2));
				c.stroke();
				showText(sortedLeaderboard[place][0], canvas.width*0.3, canvas.height*(((i+0.5)/leaderboardPerPage)*0.9+0.2), canvas.height*0.03);
				showText(sortedLeaderboard[place][1], canvas.width*0.6, canvas.height*(((i+0.5)/leaderboardPerPage)*0.9+0.2), canvas.height*0.03);
			}
		}
		leaderboardPrevButton.draw();
		leaderboardNextButton.draw();
		if(leaderboardNextButton.update() === true){
			leaderboardPage += 1
		}
		if(leaderboardPrevButton.update() === true && leaderboardPage > 0){
			leaderboardPage -= 1
		}
		setTextBoxPos(canvas.width*0.5, canvas.height*0.8);
		if(leaderboardSubmitButton.update() === true){
			var submitName = getLeaderboardName()
			if(submitName !== false){
				saveMoney();
				if(money >= 10000){
					window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
				}else{
					sendScore(money, submitName);
				}
			}
		}
		leaderboardSubmitButton.draw()
		if(backButton.update() === true){
			transition(this.pickComp);
		}
		backButton.draw();
		this.overlay();
	}

	showMoney(){
		showText("$"+round(money, 1), canvas.width*0.9, canvas.height*0.07, canvas.height*0.05, "rgb(200, 150, 50)", false, false);
		showText("$"+round(money, 1), canvas.width*0.9, canvas.height*0.07, canvas.height*0.05, "rgb(0, 0, 0)", false, true);
	}

	menuBackground(){
		if(menuBackgroundOverlay < menuBackgroundOverlayAim){
			menuBackgroundOverlay += 0.01;
		}
		if(menuBackgroundOverlay > menuBackgroundOverlayAim){
			menuBackgroundOverlay -= 0.01;
		}
		c.fillStyle = "rgba(255, 255, 255, "+menuBackgroundOverlay+")";
		c.fillRect(0, 0, canvas.width, canvas.height);
		menuBackgroundProgress += 0.001;
		cameraPosAim = [Math.sin(menuBackgroundProgress)*3, 7, -8];
		cameraPos[0] = cameraPosAim[0]*cameraPosAlpha + cameraPos[0]*(1 - cameraPosAlpha);
		cameraPos[1] = cameraPosAim[1]*cameraPosAlpha + cameraPos[1]*(1 - cameraPosAlpha);
		cameraPos[2] = cameraPosAim[2]*cameraPosAlpha + cameraPos[2]*(1 - cameraPosAlpha);
		this.background();
	}
}

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});