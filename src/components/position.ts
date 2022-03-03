import Vec2 from "../vec2";
import Component from "./component";

export default class Position extends Component {
	name = "position";
	
	constructor(private vec:Vec2) {
		super();

		return new Proxy(this, {
			get(target, prop, receiver) {
				if(prop == "name") {
					return target.name;
				}
				return target.vec[prop as keyof Vec2];
			}
		})
	}
}