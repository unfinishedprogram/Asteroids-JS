import MeshRenderer from "./components/meshRenderer";
import Circle from "./entities/circle";

let c = (document.querySelector("#canvas")! as HTMLCanvasElement);
let ctx = c.getContext("2d")!;

let test = new Circle();

c.addEventListener("mousemove", e => {
	ctx.clearRect(0, 0, c.width, c.height);
	test.components.position?.set(e.offsetX, e.offsetY);
	test.components.renderer?.draw(ctx);
	if(test.components.hitbox?.containsPoint(200, 200)) {
		(test.components.renderer as MeshRenderer).color = "red";
	} else {
		(test.components.renderer as MeshRenderer).color = "black";
	}
})