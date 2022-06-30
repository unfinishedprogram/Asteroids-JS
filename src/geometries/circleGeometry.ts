import IGeometry from "../geometry";

export default function circleGeometry(resolution:number, radius:number):IGeometry {
	let verts:[number, number][] = [];
	let tris:[number, number, number][] = [];
	
	verts.push([0, 0]);

	let step = (Math.PI*2) / resolution;

	for(let i = 0; i < resolution; i++) {
		let angle = i * step;
		verts.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
		tris.push([0, ((i+1) % resolution) + 1, i + 1]);
	}
	
	return {
		tris, 
		verts
	}

}