import Vec2 from "../../../util/vec2";
import CircleHitbox from "../circle";

export default function circleXcircle (a:CircleHitbox, b:CircleHitbox) {
	return Vec2.distanceSq(a.position, b.position) < (a.radius + b.radius) ** 2;
}