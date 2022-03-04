import Vec2 from "../util/vec2";
import Mesh from "./mesh";

export default class SquareMesh extends Mesh {
	constructor() {
		super();
		this.verts = [
			new Vec2(-10, -10),
			new Vec2(10, -10),
			new Vec2(-10, 10),
			new Vec2(10, 10)
		]
		this.tris = [
			[0, 1, 2],
			[3, 1, 2],
		]
	}
}