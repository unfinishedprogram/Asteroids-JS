import Hitbox from "./hitbox";
import Mesh from "./mesh";
import Triangle from "./triangle";
import Vec2 from "./vec2";

function genPoints(n:number, d:number){
	let arr = [];
	for(let i = 0; i < n; i++){
		arr.push(new Vec2(Math.cos(i * ((Math.PI*2) / n) ) * d, Math.sin(i * (Math.PI*2) / n) * d));
	}
	return arr;
}

let points = genPoints(12, 20);

let arr = [];

let center = new Vec2(0, 0);

for(let i = 0; i < points.length; i++){
	arr.push(new Triangle(points[i], points[(i+1)%points.length], center))
}

let mesh = new Mesh(arr, new Vec2(0, 0));
let hitbox = new Hitbox(mesh);

let c = (document.querySelector("#canvas")! as HTMLCanvasElement);
let ctx = c.getContext("2d")!;

c.addEventListener("mousemove", e => {
	mesh.position.set(e.offsetX, e.offsetY);
	ctx.clearRect(0, 0, c.width, c.height);
	mesh.draw(ctx);
})