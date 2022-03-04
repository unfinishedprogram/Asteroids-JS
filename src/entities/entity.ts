import Component, { ComponentName } from "../components/component";
import Mesh from "../components/mesh";
import Position from "../components/position";
import Renderer from "../components/renderer";

type Components = {
	"position"?: Position,
	"renderer"?: Renderer,
	"mesh"?: Mesh,
}

export default abstract class Entity {
	components: Components = {};
	constructor() {}

	protected addComponent(component:Component) {
			console.log(Object.keys(component))
			if(component.canAttach(this)) {
			(this.components[component.name] as typeof component) = component;
			component.attach(this);
		} else {
			console.error("Cannot attatched component: ", component.name);
		}
	}
}