import Component, { ComponentName } from "./component";

export default class Collision extends Component {
	required: ["hitbox", "position"] = ["hitbox", "position"];
	name: "collision" = "collision";
	layer:number;
	
	constructor(layer:number){
		super();
		this.layer = layer;
	}
}