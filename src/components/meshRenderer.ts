import { ComponentName } from "./component";
import Renderer from "./renderer";

export default class MeshRenderer extends Renderer {
	required: ComponentName[] = ["mesh"];

	constructor(public fill:boolean = false, public color:string = "black"){
		super();
	}

	draw(ctx:CanvasRenderingContext2D):void {
		let tris = this.entity?.components.mesh?.getTris()!;
		let verts = this.entity?.components.mesh?.getVerts()!;
		let pos = this.entity?.components.position!;
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;

		tris?.forEach(tri => {
			ctx.moveTo(verts[tri[0]].x + pos.x, verts[tri[0]].y + pos.y);
			ctx.lineTo(verts[tri[1]].x + pos.x, verts[tri[1]].y + pos.y);
			ctx.lineTo(verts[tri[2]].x + pos.x, verts[tri[2]].y + pos.y);
		})
		
		ctx.closePath();
		if(this.fill) ctx.fill();
		else ctx.stroke();
	}
}