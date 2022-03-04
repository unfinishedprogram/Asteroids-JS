import Vec2 from "../../util/vec2";
import vec2 from "../../util/vec2";
import Hitbox from "./hitbox";

export default class CircleHitbox extends Hitbox {
	name: "hitbox" = "hitbox";
	required: ["position"] = ["position"];
	_alignedBounds:[Vec2, Vec2] = [Vec2.ZERO, Vec2.ZERO];
	private _vec:Vec2 = new Vec2(0, 0);
	
	constructor(public readonly radius:number) {
		super();
		this._alignedBounds = [
			new Vec2(-radius, -radius),
			new Vec2(radius, radius)
		]
	}

	get alignedBounds() {
		this._alignedBounds[0].set(this.radius, this.radius).add(this.offset);
		this._alignedBounds[1].set(-this.radius, -this.radius).add(this.offset);
		return this._alignedBounds;
	}

	containsPoint(x: number, y: number): boolean {
		// let bounds = this.alignedBounds;
		// if(bounds[0].x < x) return false;
		// if(bounds[1].x > x) return false;
		// if(bounds[0].y < y) return false;
		// if(bounds[1].y > y) return false;

		this._vec.set(x, y).subtract(this.offset).subtract(this.entity?.components.position!);

		return this._vec.magnitude < this.radius;
	}

	lineCrosses(line: [vec2, vec2]): boolean {
		throw new Error("Method not implemented.");
	}
}