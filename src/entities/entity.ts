import Collision from "../components/collision";
import Component, { ComponentName } from "../components/component";
import Hitbox from "../components/hitboxes/hitbox";
import Mesh from "../components/mesh";
import Position from "../components/position";
import Renderer from "../components/renderer";

export type Components = {
	"position"?: Position,
	"renderer"?: Renderer,
	"mesh"?: Mesh,
	"hitbox"?:Hitbox,
	"collision"?:Collision,
}

export default abstract class Entity {
	private eventListners: { [key:string]:Function[] } = {};
	components: Components = {};

	public id:number;
	static curId = 0;

	static getId () {
		return this.curId++;
	}

	constructor() {
		this.id = Entity.getId();
	}

	protected addComponent(component:Component) {
			if(component.canAttach(this)) {
			(this.components[component.name] as typeof component) = component;
			component.attach(this);
		} else {
			console.error("Cannot attatched component: ", component.name);
		}
	}

	fireEvent(event:string, ...args:any) {
		if(this.eventListners[event]){
			this.eventListners[event].forEach(e => e(args))
		}
	}

	addEventTrigger(event:string, callback:()=>any ) {
		if(!this.eventListners[event]){
			this.eventListners[event] = [];
		}

		this.eventListners[event].push(callback);
	}
}