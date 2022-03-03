import Entity from "../entities/entity";

type componentReqs = string[];

export default abstract class Component {
	abstract name:string;
	required: string[] = [];

	constructor() {}
	attach(entity:Entity):boolean {
		return this.canAttach(entity);
	}

	canAttach(entity:Entity):boolean {
		const componentKeys = Object.keys(entity.components);
		for(let requirement of this.required) {
			if(!componentKeys.includes(requirement)) {
				return false;
			}
		}
		return true;
	}
}