import Entity from "./entities/entity";

export class World {
	private objects:Entity[] = [];
	
	constructor() {
		
	}

	public addObject(object:Entity) {
		this.objects.push(object);
	}

	public removeObject(object:Entity) {
		let index = this.objects.indexOf(object);
		if(index != -1) {
			this.objects.splice(index, 1);
		}
	}
}