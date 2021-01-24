import { Vector2, Vector3 } from "babylonjs"
import { MathExt } from "./Math"

// export interface iVector2 {
// 	x: number,
// 	y: number
// }


export class Vector2Ext {

	static Right = () => new Vector2(1, 0)
	static Up = () => new Vector2(0, 1)
	static right = () => new Vector2(1, 0)
	static up = () => new Vector2(0, 1)


	static toVec3XY = (vec: Vector2, z = 0) => new Vector3(vec.x, vec.y, z)
	static toVec3XZ = (vec: Vector2, y = 0) => new Vector3(vec.x, y, vec.y)
	static toVec3YZ = (vec: Vector2, x = 0) => new Vector3(x, vec.x, vec.y)

	static perpendicular = (vec: Vector2) => new Vector2(-vec.y, vec.x)

	static fromPolar = (theta: number, radius: number = 1) => new Vector2(
		Math.cos(theta) * radius,
		Math.sin(theta) * radius
	)

	static toPolar(vec: Vector2) {
		return {
			theta: Math.atan2(vec.y, vec.x),
			radius: vec.length()
		}
	}
}

