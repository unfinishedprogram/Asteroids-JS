import Position from "../components/position";
import Entity from "./entity";

export default class Circle extends Entity {
	components =  {
		position:new Position(),
	}

	constructor() {
		super();
	}
}