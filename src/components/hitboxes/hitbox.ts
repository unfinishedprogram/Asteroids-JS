import Vec2 from "../../util/vec2";
import Component, { ComponentName } from "../component";

export const HitboxTypes = {
	CIRCLE : 0,
	RECT : 1,
	MESH : 2
}

export default abstract class Hitbox extends Component {
	name: "hitbox" = "hitbox";
	required:ComponentName[] = ["position"];
	position:Vec2 = new Vec2(0, 0);
	abstract hitboxType: keyof typeof HitboxTypes;
	public offset:Vec2 = new Vec2(0, 0);
	abstract containsPoint(p:Vec2):boolean;
	abstract alignedBounds: {min:Vec2, max:Vec2};

	setPosition(vec:Vec2) {
		this.position = vec;
	}

	onAttached(): void {
		this.position = this.entity?.components.position!;
	}
}