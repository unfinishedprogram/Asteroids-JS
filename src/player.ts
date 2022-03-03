import { IDrawable } from "./drawable";

export default class Player implements IDrawable {
	draw(ctx: CanvasRenderingContext2D): void {
		throw new Error("Method not implemented");
	}

	constructor() {
	}
}