import { IDrawable } from "./drawable";
import Triangle from "./triangle";
import Vec2 from "./vec2";

export default class Mesh implements IDrawable {
	constructor(private triangles: Triangle[], public position:Vec2) {};
	draw(ctx:CanvasRenderingContext2D) {
		for(let tri of this.triangles) {
			ctx.beginPath();
			ctx.moveTo(tri.a.x + this.position.x, tri.a.y + this.position.y);
			ctx.lineTo(tri.b.x + this.position.x, tri.b.y + this.position.y);
			ctx.lineTo(tri.c.x + this.position.x, tri.c.y + this.position.y);
			ctx.closePath();
			ctx.stroke();
		}
	}
}