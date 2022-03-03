import Vec2 from "../vec2";
import Component, { ComponentName } from "./component";

type Tri = [number, number, number]

export default class Mesh extends Component {
	required:ComponentName[] = ["position"];
	name:"mesh" = "mesh";
	verts:Vec2[] = [];
	tris:Tri[] = [];
	constructor() {
		super();
	}
}