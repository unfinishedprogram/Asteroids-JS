export default class Vec2 {
	constructor(public x:number, public y:number) {
		
	}

	set(x:number, y:number){
		[this.x, this.y] = [x, y];
	}

	add(v:Vec2){
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	subtract(v:Vec2){
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	multiply(n:number) {
		this.x *= n;
		this.y *= n;
		return this;
	}

	get magnitude() {
		return (this.x ** 2 + this.y ** 2) ** 0.5;
	}

	static angleBetween (a:Vec2, b:Vec2):number {
		return Math.acos(Vec2.dotProduct(a, b)/(a.magnitude * b.magnitude))
	}

	static dotProduct (a:Vec2, b:Vec2):number {
		return a.x * b.x + a.y * b.y;
	}

	static crossProduct(a:Vec2, b:Vec2):number {
		return a.magnitude * b.magnitude * Math.sin(Vec2.angleBetween(a, b));
	}
	
	public copy( v:Vec2 ){
		[this.x, this.y] = [v.x, v.y];
	}

	public clone(): Vec2 {
		return new Vec2(this.x, this.y);
	}

	public distance(v:Vec2){
		return this.clone().add(v).magnitude;
	}
}