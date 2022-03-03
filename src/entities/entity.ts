import Component, { ComponentName } from "../components/component";

export default abstract class Entity {
	components: {
		[key in ComponentName]? : Component;
	} = {};
	
	constructor() {

	}
}