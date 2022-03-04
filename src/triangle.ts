import Vec2 from "./util/vec2";

export default class Triangle {
	constructor(public a:Vec2, public b:Vec2, public c:Vec2) {}

	areaX2() {
		return Triangle.areaX2(this.a, this.b, this.c);
	}

	static areaX2(a:Vec2, b:Vec2, c:Vec2) {
		return Math.abs (
			a.x * (b.y - c.y) + 
			b.x * (c.y - a.y) + 
			c.x * (a.y - b.y)
		);
	}

	static isInside(t:Triangle, p:Vec2){
		return !(
			t.areaX2() - (
				Triangle.areaX2(p, t.b, t.c) +
				Triangle.areaX2(t.a, p, t.c) +
				Triangle.areaX2(t.a, t.b, p)
			)
		)
	}
}