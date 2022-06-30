import IGeometry from "../geometry";
import Vec2 from "../util/vec2";
import Component, { ComponentName } from "./component";

type Tri = [number, number, number]

export default class Mesh extends Component {
	required:ComponentName[] = ["position"];
	geometry:IGeometry;
	name:"mesh" = "mesh";
	
	constructor(geometry:IGeometry) {
		super();
		this.geometry = geometry;
	}
	
	public getGeometry() {
		return this.geometry;
	}

	public getVerts() {
		return this.geometry.verts;
	}

	public getTris(){
		return this.geometry.tris;
	}
}