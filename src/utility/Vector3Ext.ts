import { DeepImmutable, Matrix, Vector2, Vector3, Viewport } from "babylonjs"

// export interface iVector2 {
// 	x: number,
// 	y: number
// }


export class Vector3Ext {

	static clampMagnitude(vector: Vector3, maxLength: number) {
		const sqrmag = vector.lengthSquared()
		if (sqrmag > maxLength * maxLength) {
			const mag = Math.sqrt(sqrmag);
			const normalized_x = vector.x / mag;
			const normalized_y = vector.y / mag;
			const normalized_z = vector.z / mag;
			return new Vector3(
				normalized_x * maxLength,
				normalized_y * maxLength,
				normalized_z * maxLength);
		}
		return vector.clone();
	}
	static toVector2XY = (vec: Vector3) => new Vector2(vec.x, vec.y)

	static addVector2(a: Vector3, b: Vector2) {
		return new Vector3(a.x + b.x, a.y + b.y, a.z)
	}

	static round(vec: Vector3) {
		return Vector3Ext.roundInPlace(vec.clone())
	}
	static roundInPlace(vec: Vector3) {
		vec.x = Math.round(vec.x)
		vec.y = Math.round(vec.y)
		vec.z = Math.round(vec.z)
		return vec
	}

	static roundToNearest(vec: Vector3, interval: number) {
		return Vector3Ext.roundToNearestInPlace(vec.clone(), interval)
	}

	static roundToNearestInPlace(vec: Vector3, interval: number) {
		vec.x = interval * Math.round(vec.x / interval)
		vec.y = interval * Math.round(vec.y / interval)
		vec.z = interval * Math.round(vec.z / interval)
		return vec
	}
}

