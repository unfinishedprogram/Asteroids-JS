import Mesh from "./mesh";

export default class Hitbox {
	public mesh : Mesh;
	constructor(mesh:Mesh) {
		this.mesh = mesh;
	}
}