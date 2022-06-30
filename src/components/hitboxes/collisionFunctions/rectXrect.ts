import RectHitbox from "../rect";
import boundsCheck from "./boundsCheck";

export default function rectXrect(a:RectHitbox, b:RectHitbox) {
	return boundsCheck(a, b);
}