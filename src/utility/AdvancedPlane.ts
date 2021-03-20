import { Plane, Ray, Vector2, Vector3 } from "babylonjs";
import { Color4Ext, QuaternionExt } from "../";
import { DebugLines } from "../modules/core";




export class AdvancedPlane {

	babyPlane: Plane
	origin: Vector3
	normal: Vector3
	tangent: Vector3
	bitangent: Vector3

	constructor(origin: Vector3, normal: Vector3, bitangent: Vector3 = Vector3.Up()) {
		this.origin = origin
		this.normal = Vector3.Normalize(normal)
		const rot = QuaternionExt.lookRotation(this.normal, bitangent)//works even if normal === up
		this.tangent = QuaternionExt.right(rot)
		this.bitangent = QuaternionExt.up(rot)
		this.babyPlane = Plane.FromPositionAndNormal(origin, normal)
	}

	projectVector2 = (vec: Vector2) => this.tangent.scale(vec.x).add(this.bitangent.scale(vec.y))

	//from babylonjs
	pointOnPlane(point: Vector3) {
		const d = -(this.normal.x * this.origin.x + this.normal.y * this.origin.y + this.normal.z * this.origin.z);
		const dist = Vector3.Dot(point, this.normal) + d;
		return point.subtract(this.normal.scale(dist))
	}


	raycastPlane(ray: Ray) {
		var dPos = ray.origin.subtract(this.origin);
		var dot1 = Vector3.Dot(dPos, this.normal);
		var dot2 = Vector3.Dot(ray.direction, this.normal);
		if (dot2 == 0) 		//ray is parrallel to plane
			return;
		var dot3 = dot1 / dot2;
		if (dot3 > 0) 			//intersection is behind ray
			return;
		return ray.origin.subtract(ray.direction.scale(dot3));
	}

	// projectVector3(point: Vector3) {
	// 	const planePoint = this.pointOnPlane(point)
	// 	return this.projectVector2(Vector3Ext.toVector2(planePoint))
	// }

	toString = () => `origin: ${this.origin}, normal: ${this.normal}, tangent: ${this.tangent}, bitangent: ${this.bitangent}`


	debug(debugLines: DebugLines) {
		debugLines.addLine(this.origin, this.origin.add(this.tangent), Color4Ext.Red())
		debugLines.addLine(this.origin, this.origin.add(this.bitangent), Color4Ext.Green())
		debugLines.addLine(this.origin, this.origin.add(this.normal), Color4Ext.Blue())
	}
}