import Component from "../components/component";

export default abstract class Entity {
	components = {} as {
		[index:string] : Component;
	}
	constructor() {

	}
}