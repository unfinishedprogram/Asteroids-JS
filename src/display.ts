import Renderer from "./components/renderer";
import { World } from "./world";

export class display {
	private ctx:CanvasRenderingContext2D;

	constructor(canvas:HTMLCanvasElement) {
		this.ctx = canvas.getContext("2d")!;
	}

	drawObject(object:Renderer) {
		object.draw(this.ctx);
	}

	drawWorld(world:World) {
	}
}