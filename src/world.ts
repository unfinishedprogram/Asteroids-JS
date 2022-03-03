import GameObject from "./gameObject";

export class World {
	private objects:GameObject[] = [];
	
	constructor() {

	}

	public addObject(object:GameObject) {
		this.objects.push(object);
	}

	public removeObject(object:GameObject) {
		let index = this.objects.indexOf(object);
		if(index != -1) {
			this.objects.splice(index, 1);
		}
	}
}