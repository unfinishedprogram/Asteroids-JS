import Vec2 from "../../util/vec2";
import Mesh from "../mesh";

export default class CircleMesh extends Mesh {
	constructor(radius:number, resolution:number){
		super();
		this.verts.push(new Vec2(0, 0));

		let step = (Math.PI*2) / resolution;
		for(let i = 0; i < resolution; i++) {
			let angle = i * step;
			this.verts.push(new Vec2(Math.cos(angle) * radius, Math.sin(angle) * radius));
			this.tris.push([0, (i + 1) % resolution + 1, i + 1]);
		}
	}
}