import Component, { ComponentName } from "./component";

export default abstract class Renderer extends Component {
	name:"renderer" = "renderer"
	required: ComponentName[] = [];
	
	constructor(){
		super();
	}

	abstract draw(ctx:CanvasRenderingContext2D):void;
}