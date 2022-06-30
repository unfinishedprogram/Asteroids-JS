import Vec2 from "../../../util/vec2";
import CircleHitbox from "../circle";
import RectHitbox from "../rect";
import boundsCheck from "./boundsCheck";

export default function circleXrect(a:CircleHitbox, b:RectHitbox):boolean {
	if(!boundsCheck(a, b)) {
		return false;
	}
	let bBounds = b.alignedBounds;
	if(a.containsPoint(bBounds.min)) return true;
	if(a.containsPoint(bBounds.max)) return true;
	if(a.containsPoint(Vec2.tmp.set(bBounds.min.x, bBounds.max.y))) return true;
	if(a.containsPoint(Vec2.tmp.set(bBounds.max.x, bBounds.min.y))) return true;
	return false;
}