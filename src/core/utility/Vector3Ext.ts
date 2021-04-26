import { DeepImmutable, Matrix, Vector2, Vector3, Viewport } from "babylonjs"

export interface iVecXYZ {
	x: number,
	y: number,
	z: number,
}

export const clampMagnitude = (vector: Vector3, maxLength: number) => {
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
export const isEqual = (a: Vector3, b: Vector3) => a.x === b.x && a.y === b.y && a.z === b.z
export const toXYZ = (vec: Vector3) => ({ x: vec.x, y: vec.y, z: vec.z })
export const fromXYZ = (vec: iVecXYZ) => new Vector3(vec.x, vec.y, vec.z)

export const toVector2XY = (vec: Vector3) =>
	new Vector2(vec.x, vec.y)

export const addVector2 = (a: Vector3, b: Vector2) =>
	new Vector3(a.x + b.x, a.y + b.y, a.z)

export const round = (vec: Vector3) =>
	roundInPlace(vec.clone())
export const roundInPlace = (vec: Vector3) => {
	vec.x = Math.round(vec.x)
	vec.y = Math.round(vec.y)
	vec.z = Math.round(vec.z)
	return vec
}

export const roundToNearest = (vec: Vector3, interval: number) =>
	roundToNearestInPlace(vec.clone(), interval)


export const roundToNearestInPlace = (vec: Vector3, interval: number) => {
	vec.x = interval * Math.round(vec.x / interval)
	vec.y = interval * Math.round(vec.y / interval)
	vec.z = interval * Math.round(vec.z / interval)
	return vec
}

export const toFixed = (vec: Vector3, val = 2) => `x:${vec.x.toFixed(val)} y:${vec.y.toFixed(val)} z:${vec.z.toFixed(val)}`