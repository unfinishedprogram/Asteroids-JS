import Vec2 from "../../util/vec2";
import Hitbox from "./hitbox";

export default class CircleHitbox extends Hitbox {
	hitboxType:"CIRCLE" = "CIRCLE";
	private _alignedBounds:{min:Vec2, max:Vec2};
	private _vec:Vec2 = new Vec2(0, 0);
	
	constructor(public readonly radius:number) {
		super();
		this._alignedBounds = {
			min:new Vec2(-radius, -radius),
			max:new Vec2(radius, radius)
		}
	}

	get alignedBounds () {
		this._alignedBounds.min.set(-this.radius, -this.radius).add(this.position);
		this._alignedBounds.max.set(this.radius, this.radius).add(this.position);
		return this._alignedBounds;
	}

	containsPoint(p:Vec2): boolean {
		return Vec2.distanceSq(p, this.position) > this.radius ** 2;
	}
}