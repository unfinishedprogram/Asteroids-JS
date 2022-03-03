const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

const canvas_width = 600;
const canvas_height = 600;

c.width = canvas_width;
c.height = canvas_height;

function vector2(x, y){
	this.x = x;
	this.y = y;
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function toRadians(angle){
	return Math.PI*(angle)/180;
}
function dotProduct(v1, v2){
	return(v1.x*v2.x)+(v1.y*v2.y);
}
function angleBetween(v1, v2){
	return Math.acos(dotProduct(v1, v2)/(magnitude(v1)*magnitude(v2)));
}
function magnitude(v){
	return Math.sqrt(v.x*v.x + v.y*v.y);
}
function crossProduct(v1, v2){
	return magnitude(v1)*magnitude(v2)*Math.sin(angleBetween(v1, v2));
}
function subtractVector(v1, v2){
	return new vector2(v1.x-v2.x, v1.y - v2.y);
}
function addVectors(v1, v2){
	return new vector2(v1.x + v2.x, v1.y + v2.y);
}
function distancebetween(v1, v2){
	return Math.sqrt((Math.abs(v1.x-v2.x)*(Math.abs(v1.x-v2.x)) + (Math.abs(v1.y-v2.y)*(Math.abs(v1.y-v2.y)))));
}

function area(x1, y1, x2, y2,x3, y3) {return Math.abs((x1*(y2-y3) + x2*(y3-y1)+x3*(y1-y2))/2)}


function isInside(v1, v2, v3, p){   
   	/* Calculate area of triangle ABC */
   	let  A = area(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y); //Done
   	/* Calculate area of triangle PBC */  
   	let A1 = area(p.x, p.y, v2.x, v2.y, v3.x, v3.y); //Done
    /* Calculate area of triangle PAC */  
   	let A2 = area(v1.x, v1.y, p.x, p.y, v3.x, v3.y); //Done
   	/* Calculate area of triangle PAB */   
   	let A3 = area(v1.x, v1.y, v2.x, v2.y, p.x, p.y); //Done
   	/* Check if sum of A1, A2 and A3 is same as A */
	return (A == A1 + A2 + A3);
}

function explosion(n, pos){
	this.particles = [];
	this.pos = pos;
	this.age = 0;
	for (var i = n - 1; i >= 0; i--) {
		this.particles.push(new particle(pos));
	}
	this.step = function(){

		this.age++;
		if (this.age > 50) {
			this.particles = [];
			explosions.splice(explosions.indexOf(this), 1);
			return;
		}
		for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].step();
		}
	}
	this.draw = function(){
		for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].draw();
		}
	}
}

function particle(pos){
	this.pos = pos;
	this.rot = Math.random()*360;
	
	this.vol = new vector2(Math.cos(toRadians(this.rot))*Math.random(), Math.sin(toRadians(this.rot))*Math.random());

	this.step = function(){
		this.pos = addVectors(this.pos, this.vol);
	}
	this.draw = function(){
		ctx.beginPath();
		ctx.rect(this.pos.x-1, this.pos.y-1,1, 1);
		ctx.stroke();
	}
}


function asteroid(x, y, dir, magnitude){
	this.angleRad = Math.PI*(dir)/180;
	this.magnitude = magnitude;
	this.vertCount = 12;
	this.speed = Math.random()+0.2;
	this.pos = new vector2(x,y);
	this.vol = new vector2(Math.cos(this.angleRad)*this.speed, Math.sin(this.angleRad)*this.speed);
	this.verts = [];
	

	for (var i = this.vertCount - 1; i >= 0; i--) {
		let distance = Math.random()+5/6;
		let angle = (360/this.vertCount) * i;

		let x = Math.cos(toRadians(angle))*this.magnitude*distance;
		let y = Math.sin(toRadians(angle))*this.magnitude*distance;
		this.verts[i] = new vector2(x,y);
	}
	
	this.draw = function(){
		ctx.beginPath();
		for (var i = this.verts.length - 1; i >= 0; i--) {
			ctx.lineTo(this.pos.x + this.verts[i].x, this.pos.y + this.verts[i].y);
		}
		ctx.closePath();
		ctx.stroke();
	}
	this.step = function(){
		this.pos = addVectors(this.pos, this.vol);
		if (this.pos.x > canvas_width+200) asteroids.splice(asteroids.indexOf(this), 1);
		if (this.pos.y > canvas_height+200) asteroids.splice(asteroids.indexOf(this), 1);
		if (this.pos.x < -200) asteroids.splice(asteroids.indexOf(this), 1);
		if (this.pos.y < -200) asteroids.splice(asteroids.indexOf(this), 1);

		if (distancebetween(this.pos, new vector2(player.x, player.y)) < 50) {

			pverts = [player.verts[0],  player.verts[1],  player.verts[3]];

			for (var j = 0; j <= this.verts.length-1; j++) {
					if (j == 11) {
						var p1 = addVectors(this.pos, this.verts[0]);
					}else{
						var p1 = addVectors(this.pos, this.verts[j+1]);
					}
					for (var i = pverts.length - 1; i >= 0; i--) {
						let nextX = player.x + (Math.cos(toRadians(player.angle))*pverts[i].x - Math.sin(toRadians(player.angle))*pverts[i].y);
						let nextY = player.y + (Math.sin(toRadians(player.angle))*pverts[i].x + Math.cos(toRadians(player.angle))*pverts[i].y);
						
						let p2 = addVectors(this.pos, this.verts[j]);
						let p3 = this.pos;
						let p = new vector2(nextX, nextY);

						if (isInside(p1, p2, p3,p)) {
							game_over();
						}
					}
				}
			}
		for (var i = bullets.length - 1; i >= 0; i--) {
			if (distancebetween(bullets[i].pos, this.pos) < 50) {
				for (var j = 0; j <= this.verts.length-1; j++) {
					if (j == 11) {
						var p1 = addVectors(this.pos, this.verts[0]);
					}else{
						var p1 = addVectors(this.pos, this.verts[j+1]);
					}
					let p2 = addVectors(this.pos, this.verts[j]);
					let p3 = this.pos;
					let p = bullets[i].pos;
					let stepRes = 10;

					for (var z = 0; z <= 10; z++) {
						var x2check = Math.cos(toRadians(bullets[i].dir))*z;
						var y2check = Math.sin(toRadians(bullets[i].dir))*z;
						var vec2check = addVectors(p, new vector2(x2check, y2check));
						if (isInside(p1, p2, p3,vec2check)) {
							
							if (this.magnitude > 10) {
								asteroids.push(new asteroid(this.pos.x, this.pos.y, Math.random()*360, this.magnitude/2));
								asteroids.push(new asteroid(this.pos.x, this.pos.y, Math.random()*360, this.magnitude/2));
							}
							score++;
							explosions.push(new explosion(10,bullets[i].pos));
							bullets.splice(i, 1);
							asteroids.splice(asteroids.indexOf(this), 1);
							return;
						}
					}		
				}
			}
		}
	}
}


function bullet(x,y,dir){
	this.pos = new vector2(x,y);
	this.dir = dir;
	this.step = function(){
		let angleRad = Math.PI*(this.dir)/180;
		this.pos.x += Math.cos(angleRad)*2;
		this.pos.y += Math.sin(angleRad)*2;
		if (this.pos.x > canvas_width) bullets.splice(bullets.indexOf(this), 1);
		if (this.pos.y > canvas_height) bullets.splice(bullets.indexOf(this), 1);
		if (this.pos.x < 0) bullets.splice(bullets.indexOf(this), 1);
		if (this.pos.y < 0) bullets.splice(bullets.indexOf(this), 1);
	}
	this.draw = function(){
		let angleRad = Math.PI*(this.dir)/180;
		ctx.beginPath();
		ctx.moveTo(this.pos.x,this.pos.y);
		ctx.lineTo(this.pos.x+Math.cos(angleRad)*10,this.pos.y+Math.sin(angleRad)*10);
		ctx.closePath();
		ctx.stroke();
	}
}

var bullets =  [];
var asteroids = [];
var explosions = [];
var score = 0;

var player = {
	health: 20,
	x: canvas_width/2,
	y: canvas_height/2,
	xVol: 0,
	yVol: 0,
	drag: 0.98,
	angle: 0,
	verts: [
		new vector2(0,-7),
		new vector2(4,4),
		new vector2(0,0),
		new vector2(-4,4),
		new vector2(0,-7)],
	step: function(){
		if (this.x > canvas_width) this.x = 0;
		if (this.y > canvas_height) this.y = 0;
		if (this.x < 0) this.x = canvas_width;
		if (this.y < 0) this.y = canvas_height;
		this.x+=this.xVol;
		this.y+=this.yVol;

		this.yVol*=this.drag;
		this.xVol*=this.drag;

		if (this.angle >= 360) {this.angle -= 360};
		if (pressedKeys["38"]) {
			angleRad = Math.PI*(this.angle-90)/180;
			this.xVol+=Math.cos(angleRad)/15;
			this.yVol+=Math.sin(angleRad)/15;
		}
		if (pressedKeys["37"]) {
			this.angle-=2;
		} 
		if (pressedKeys["39"]) {
			this.angle+=2;
		}
		if (pressedKeys["32"] && bullet_timer <= 0) {
			bullets.push(new bullet(this.x,this.y,this.angle-90));
			bullet_timer = 50;
		}
	},
	
	draw: function(){
		angleRad = Math.PI*this.angle/180;
		ctx.beginPath();
		x = Math.cos(angleRad) - Math.sin(angleRad);
		y = Math.cos(angleRad) - Math.sin(angleRad);
		for (var i = this.verts.length - 1; i >= 0; i--) {
			let nextX = this.x+(Math.cos(angleRad)*this.verts[i].x - Math.sin(angleRad)*this.verts[i].y);
			let nextY = this.y+(Math.sin(angleRad)*this.verts[i].x + Math.cos(angleRad)*this.verts[i].y);
			ctx.lineTo(nextX,nextY);
		}              
		ctx.closePath();
		ctx.stroke();
	}
}

var bullet_timer = 0;
var asteroid_timer = 0;
if (localStorage.getItem("highscore")) {
	highscore = localStorage.getItem("highscore");
}else{
	highscore = null;
}

var lastLoop = new Date();

function doStuff(){
	thisLoop = new Date();
	var fps = (1000 / (thisLoop - lastLoop));
	lastLoop = thisLoop;
	bullet_timer--;
	asteroid_timer--;
	if (asteroid_timer <= 0) {
		let angle = Math.random()*360;
		let angleRad = Math.PI*(angle)/180;

		let x = Math.cos(angleRad)*500 + canvas_width/2;
		let y = Math.sin(angleRad)*500 + canvas_width/2;
		asteroids.push(new asteroid(x ,y , (angle + 180) + Math.random()*60-30, (Math.random()*30+20)/2));
		asteroid_timer = 100;
	}

	ctx.clearRect(0, 0, canvas_width, canvas_height);
	player.step();
	player.draw();

	for (var i = bullets.length - 1; i >= 0; i--) {
		bullets[i].step();
		if (bullets[i]) {
			bullets[i].draw();
		}
	}
	for (var i = asteroids.length - 1; i >= 0; i--) {
		asteroids[i].step();
		if (asteroids[i]) {
			asteroids[i].draw();
		}
	}
	for (var i = explosions.length - 1; i >= 0; i--) {
		explosions[i].step();
		if (explosions[i]) {
			explosions[i].draw();
		}
	}
	ctx.textAlign = "left"; 
	ctx.font = "20px Imapct";
	ctx.fillText("Score: " + score, 10, 23); 
	if (highscore) {
		ctx.fillText("High-Score: " + highscore, 10, 43); 
	}
	//ctx.fillText("Fps: " + Math.round(fps), 10, 60); 
}


var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

function game_over() {
	if (localStorage.getItem("highscore")) {
		if (localStorage.getItem("highscore") < score){
			localStorage.setItem("highscore", score);
		}
		
	}else{
		localStorage.setItem("highscore", score);
	}
	clearInterval(myTimer);
	ctx.font = "40px Imapct";
	ctx.textAlign = "center"; 
	ctx.fillText("GAME OVER", canvas_width/2, canvas_height/2); 
	ctx.font = "13px Imapct";
	ctx.fillText("CTRL+R  to retry", canvas_width/2, canvas_height/2+20); 
}

var myTimer = setInterval(doStuff, 1000/120);