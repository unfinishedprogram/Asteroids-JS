import IGeometry from "../geometry";
import Renderer from "./renderer";

export default class MeshRenderer extends Renderer {
	required: ["position"] = ["position"];

	constructor(private geometry:IGeometry, public fill:boolean = false, public color:string = "black"){
		super();
	}

	draw(ctx:CanvasRenderingContext2D):void {
		let pos = this.entity?.components.position!;

		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;

		ctx.beginPath();

		this.geometry.tris.forEach(tri => {
			ctx.moveTo(this.geometry.verts[tri[0]][0] + pos.x, this.geometry.verts[tri[0]][1] + pos.y);
			ctx.lineTo(this.geometry.verts[tri[1]][0] + pos.x, this.geometry.verts[tri[1]][1] + pos.y);
			ctx.lineTo(this.geometry.verts[tri[2]][0] + pos.x, this.geometry.verts[tri[2]][1] + pos.y);
			ctx.closePath();
		})
		
		if(this.fill) ctx.fill();
		else ctx.stroke();
	}
}