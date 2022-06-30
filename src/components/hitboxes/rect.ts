import { Components } from "../../entities/entity";
import Vec2 from "../../util/vec2";
import Hitbox from "./hitbox";

export default class RectHitbox extends Hitbox {
	hitboxType: "RECT" = "RECT";
	localBounds: {min:Vec2, max:Vec2};
	_alignedBounds:{min:Vec2, max:Vec2};

	containsPoint(p:Vec2): boolean {
		console.error("Unimplemented method")
		return false;
	}

	get alignedBounds () {
		this._alignedBounds.min.copy(this.localBounds.min).add(this.position);
		this._alignedBounds.max.copy(this.localBounds.max).add(this.position);
		return this._alignedBounds;
	}
	constructor(min:Vec2, max:Vec2) {
		super();
		this.localBounds = {min, max};
		this._alignedBounds = {min:min.clone(), max:max.clone()}; 
	}
}