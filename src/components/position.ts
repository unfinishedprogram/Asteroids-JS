import { proxyClass } from "../util/proxy";
import Vec2 from "../vec2";
import Component from "./component";

export default class Position extends proxyClass<Vec2 & Component>() {
	name:"position" = "position";
	private vec:Vec2
	constructor() {
		super();

		this.vec = new Vec2(0, 0);
		let proxy = new Proxy(this, {
			get(target, prop, receiver) {
				if(prop == "name") {
					return target.name;
				}
				return target.vec[prop as keyof Vec2];
			}
		}) as (Vec2 & this) 

		return proxy;
	}
}