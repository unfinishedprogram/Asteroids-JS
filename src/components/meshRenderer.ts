import Component, { ComponentName } from "./component";
import Renderer from "./renderer";

export default class MeshRenderer extends Renderer {
	required: ComponentName[] = ["mesh"];
	constructor(){
		super();
	}

	draw(ctx:CanvasRenderingContext2D):void {
		let tris = this.entity?.components.mesh?.getTris();
	}
}