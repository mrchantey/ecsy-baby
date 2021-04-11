import { Vector2, Vector3 } from "babylonjs"
import { MathExt } from "../../ecsy-extra/index"

// export interface iVector2 {
// 	x: number,
// 	y: number
// }
export const isEqual = (a: Vector2, b: Vector2) => a.x === b.x && a.y === b.y
export const Right = () => new Vector2(1, 0)
export const Up = () => new Vector2(0, 1)
export const right = () => new Vector2(1, 0)
export const up = () => new Vector2(0, 1)
export const dot = (a: Vector2, b: Vector2) => a.x * b.x + a.y * b.y

export const toVec3XY = (vec: Vector2, z = 0) => new Vector3(vec.x, vec.y, z)
export const toVec3XZ = (vec: Vector2, y = 0) => new Vector3(vec.x, y, vec.y)
export const toVec3YZ = (vec: Vector2, x = 0) => new Vector3(x, vec.x, vec.y)

export const add = (a: Vector2, b: Vector2) => new Vector2(a.x + b.x, a.y + b.y)
export const sub = (a: Vector2, b: Vector2) => new Vector2(a.x - b.x, a.y - b.y)
export const scale = (vec: Vector2, s: number) => new Vector2(vec.x * s, vec.y * s)
export const magnitude = (vec: Vector2) => Math.sqrt(vec.x * vec.x + vec.y * vec.y)
export const normalize = (vec: Vector2) => {
	const mag = magnitude(vec)
	return new Vector2(vec.x / mag, vec.y / mag)
}
export const direction = (a: Vector2, b: Vector2) => normalize(sub(b, a))
export const average = (a: Vector2, b: Vector2) => scale(add(a, b), 0.5)
export const distance = (a: Vector2, b: Vector2) => magnitude(sub(b, a))
export const lerp = (a: Vector2, b: Vector2, t: number) =>
	new Vector2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)
export const perpendicular = (vec: Vector2) => new Vector2(-vec.y, vec.x)
export const angle = (vec: Vector2) => Math.atan2(vec.y, vec.x)

export const angleBetween = (a: Vector2, b: Vector2) => {
	const d = dot(a, b)
	const m = magnitude(a) * magnitude(b)
	return Math.acos(d / m)
}

export const signedAngleBetween = (a: Vector2, b: Vector2) => {
	const thetaA = angle(a)
	const thetaB = angle(b)
	const theta = thetaB - thetaA
	if (theta > MathExt.PI)
		return theta - MathExt.TWO_PI
	else if (theta < -MathExt.PI)
		return theta + MathExt.TWO_PI
	else
		return theta
}
export const deltaAngle = (a: Vector2, b: Vector2, c: Vector2) => {
	const deltaAB = sub(b, a)
	const deltaBC = sub(c, b)
	return angleBetween(deltaAB, deltaBC)
}
export const signedDeltaAngle = (a: Vector2, b: Vector2, c: Vector2) => {
	const deltaAB = sub(b, a)
	const deltaBC = sub(c, b)
	return signedAngleBetween(deltaAB, deltaBC)
}

export const toPolar = (vec: Vector2) => {
	return {
		theta: Math.atan2(vec.y, vec.x),
		radius: vec.length()
	}
}
export const fromPolar = (theta: number, radius: number = 1) => new Vector2(
	Math.cos(theta) * radius,
	Math.sin(theta) * radius
)

