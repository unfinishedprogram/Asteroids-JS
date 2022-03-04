import Vec2 from "../../util/vec2";
import Component from "../component";

export default abstract class Hitbox extends Component {
	public offset:Vec2 = new Vec2(0, 0);
	abstract containsPoint(x: number, y:number):boolean;
	abstract alignedBounds: [Vec2, Vec2];
	abstract lineCrosses(line: [Vec2, Vec2]):boolean;
}