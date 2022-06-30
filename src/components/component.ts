import Entity, { Components } from "../entities/entity";

export type ComponentName = keyof Components;

export default abstract class Component {
	abstract name: ComponentName;
	abstract required: ComponentName[];
	public attached:boolean = false;
	public entity?:Entity;

	constructor() {}

	attach(entity:Entity) {
		this.entity = entity;
		this.attached = true;
		this.onAttached();
	}

	onAttached():void {};

	canAttach(entity:Entity): boolean {
		const componentKeys = Object.keys(entity.components);
		for(let requirement of this.required) {
			if(!componentKeys.includes(requirement)) {
				return false;
			}
		}
		return true;
	}
}