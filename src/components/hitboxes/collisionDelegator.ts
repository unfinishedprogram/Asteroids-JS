import circleXcircle from "./collisionFunctions/circleXcircle";
import rectXrect from "./collisionFunctions/rectXrect";
import { HitboxTypes } from "./hitbox";
import Hitbox  from "./hitbox";
import circleXrect from "./collisionFunctions/circleXrect";

const selfCollision = {
	CIRCLE : circleXcircle,
	RECT : rectXrect,
	MESH : circleXcircle,
}

function unimplemented () {
	console.error("Unimplemented collision attempted")
	return false;
}

const collisionMapping = {
	"CIRCLE" : {
		"CIRCLE" : circleXcircle,
		"RECT" : circleXrect,
		"MESH" : unimplemented,
	},

	"RECT" : {
		"CIRCLE" : unimplemented,
		"RECT" : rectXrect,
		"MESH" : unimplemented
	},

	"MESH" : {
		"CIRCLE" : unimplemented,
		"RECT" : unimplemented,
		"MESH" : unimplemented
	}
}

function getCollisionFunction (
	a: keyof typeof HitboxTypes, 
	b: keyof typeof HitboxTypes):(a:Hitbox, b:Hitbox) => boolean {
		return collisionMapping[a][b] as (a:Hitbox, b:Hitbox) => boolean;
}

export function isColliding <T extends Hitbox>(a:T, b:T) : boolean {
	// Swapping for correct order of enums
	[a, b] = (a.hitboxType > b.hitboxType) ? [a, b] : [b, a];

	return getCollisionFunction(a.hitboxType, b.hitboxType)(a, b);
}