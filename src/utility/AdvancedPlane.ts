import { Plane, Vector2, Vector3 } from "babylonjs";
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