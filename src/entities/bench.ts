import Collision from "../components/collision";
import CircleHitbox from "../components/hitboxes/circle";
import MeshRenderer from "../components/meshRenderer";
import Position from "../components/position";
import circleGeometry from "../geometries/circleGeometry";
import Vec2 from "../util/vec2";
import Entity from "./entity";

export default class Bench extends Entity {
	vel = new Vec2((Math.random() - 0.5), (Math.random() - 0.5));
	
	hit:boolean = false;
	constructor() {
		super();
		let r = 20 * Math.random();
		let geo = circleGeometry(8, r);
		this.addComponent(new Position());
		this.addComponent(new MeshRenderer(geo, true));
		this.addComponent(new CircleHitbox(r));
		this.addComponent(new Collision(0));
		this.addEventTrigger("collision", () => {
			this.hit = true;
		})
	}

	step() {
		if(this.hit){
			(this.components.renderer as MeshRenderer).color = "red";
			this.hit = false;
		} else {
			(this.components.renderer as MeshRenderer).color = "black";
		}

		this.components.position?.add(this.vel);

		if(this.components.position?.x! < 0 || this.components.position?.x! > 600){
			this.vel.x *= -1;
		}

		if(this.components.position?.y! < 0 || this.components.position?.y! > 600){
			this.vel.y *= -1;
		}
	}
}