import MeshRenderer from "../components/meshRenderer";
import Position from "../components/position";
import Entity from "./entity";
import CircleHitbox from "../components/hitboxes/circle";
import circleGeometry from "../geometries/circleGeometry";

export default class Circle extends Entity {
	constructor() {
		super();
		this.addComponent(new Position());
		this.addComponent(new MeshRenderer(circleGeometry(32, 50), false, "black"));
		this.addComponent(new CircleHitbox(50));
	}
}