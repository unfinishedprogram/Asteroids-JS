import Hitbox from "../hitbox";

export default function boundsCheck(a:Hitbox, b:Hitbox):boolean{
	if(a.alignedBounds.min.x + a.position.x > b.alignedBounds.max.x + b.position.x) return false;
	if(a.alignedBounds.min.y + a.position.y > b.alignedBounds.max.y + b.position.y) return false;
	if(a.alignedBounds.max.y + a.position.y < b.alignedBounds.min.y + b.position.y) return false;
	if(a.alignedBounds.max.x + a.position.x < b.alignedBounds.min.x + b.position.x) return false;
	
	return true;
}