import { ComponentName } from "./component";
import Renderer from "./renderer";

export default class CompositeRenderer extends Renderer {
	name:"renderer" = "renderer";
	required: ComponentName[] = [];
	renderers: Renderer[] = [];

	constructor(...renderers: Renderer[]) {
		super();
		this.renderers.push(...renderers);
	}

	onAttached(){
		this.renderers.forEach(renderer => {
			renderer.attach(this.entity!);
		})
	}

	addRenderer(renderer:Renderer) {
		this.renderers.push(renderer);
		if(this.attached){
			renderer.attach(this.entity!)
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.renderers.forEach(renderer => {
			renderer.draw(ctx);
		})
	}
}
