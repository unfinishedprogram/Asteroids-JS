import { isColliding } from "./components/hitboxes/collisionDelegator";
import Entity from "./entities/entity";
import { quickSort } from "./util/sort";

type sweptEntity = {
	pos:number, 
	end:boolean
 	entity:Entity,
}

function compare(a:sweptEntity, b:sweptEntity) {
	return a.pos-b.pos;
}

export default class CollisionManager {
	layers: Entity[][] = [];
	checks = 0;
	start = performance.now();

	addObject(entity:Entity) {
		let layer = entity.components.collision!.layer!;
		if(!this.layers[layer]) {
			this.layers[layer] = [];
		}
		this.layers[layer].push(entity);
	}

	aabbSweep(layer:number, axis:boolean):[Entity, Entity][] {
		let raw = this.layers[layer];
		let sorted:sweptEntity[] = [];
		let pairs:[Entity, Entity][] = [];
		let ax:"x" | "y" = axis ? "x" : "y";

		raw.forEach(entity => {
			let bounds = entity.components.hitbox!.alignedBounds;
			sorted.push({
				pos:bounds.min[ax],
				end:false,
				entity,
			},{
				pos:bounds.max[ax],
				end:true,
				entity,
			})
		})


		sorted.sort(compare);

		const inside:Entity[] = [];		

		for(let i = 0; i < sorted.length; i++){
			if(!sorted[i].end) {
				inside.forEach(e => {
					pairs.push([sorted[i].entity, e]);
				})
				inside.push(sorted[i].entity);
			} else {
				let index = inside.indexOf(sorted[i].entity)
				inside.splice(index, 1);
			}
		}

		return pairs;
	}

	checkCollisions() {
		let vert = this.aabbSweep(0, true);
		let horz = this.aabbSweep(0, false);

		const	toCheck = vert.length > horz.length ? horz : vert;

		toCheck.forEach(pair => this.checkCollision(pair));

		if(this.checks++ == 2000) {
			this.start = performance.now();
			console.log("Starting benchmark")
		}

		if(this.checks == 3000) {
			console.log("END", performance.now() - this.start, toCheck.length);
		}
	}

	checkCollision(pair:[Entity, Entity]) {
		let hb = [pair[0].components.hitbox!, pair[1].components.hitbox!];
		if(isColliding(hb[0], hb[1])) {
			pair[0].fireEvent("collision", pair[1]);
			pair[1].fireEvent("collision", pair[0]);
		}
	}
}