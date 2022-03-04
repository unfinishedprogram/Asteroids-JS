import Mesh from "../components/mesh";
import MeshRenderer from "../components/meshRenderer";
import Position from "../components/position";
import Entity from "./entity";

export default class Circle extends Entity {
	constructor() {
		super();
		this.addComponent(new Position());
		this.addComponent(new Mesh());
		this.addComponent(new MeshRenderer());
	}
}