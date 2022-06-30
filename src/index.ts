import CollisionManager from "./collisionManager";
import Bench from "./entities/bench";

let c = (document.querySelector("#canvas")! as HTMLCanvasElement);
let ctx = c.getContext("2d")!;

let entities:Bench[] = [];

for(let i = 0; i < 200; i++) {
	entities.push(new Bench());
}

let manager = new CollisionManager();

entities.forEach(e => manager.addObject(e))

setInterval(() => {
	let t = performance.now()
	let i = 0;
	while(performance.now() - t < 100){
		manager.checkCollisions();
		entities.forEach(entity => {
			entity.step();
		})
		i++;
	}
	ctx.clearRect(0, 0, c.width, c.height);
	entities.forEach(entity => {
		entity.components.renderer?.draw(ctx);
	})
}, 100)
