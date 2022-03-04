import MeshRenderer from "../components/meshRenderer";
import Position from "../components/position";
import Entity from "./entity";
import CircleMesh from "../components/meshes/circle";
import CircleHitbox from "../components/hitboxes/circle";

export default class Circle extends Entity {
	constructor() {
		super();
		this.addComponent(new Position());
		this.addComponent(new CircleMesh(50, 6));
		this.addComponent(new MeshRenderer(false, "black"));
		this.addComponent(new CircleHitbox(50));
	}
}

