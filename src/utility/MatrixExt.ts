import { Plane, Vector2, Vector3, Matrix, Quaternion } from "babylonjs";
import { DebugLines } from "../modules/core/components";




// var x = new Matrix



/*


COLUMN MAJOR - UNITY

	  x  y  z  pos
	[ 0, 1, 2, 3]
	[ 4, 5, 6, 7]
	[ 8, 9,10,11]
	[12,13,14,15]


ROW MAJOR - BABYLON

x	[ 0, 1, 2, 3]
y	[ 4, 5, 6, 7]
z	[ 8, 9,10,11]
pos	[12,13,14,15]


	*/


export function invertToNew(matrix: Matrix) {
	const m = new Matrix()
	matrix.invertToRef(m)
	return m
}

export function fromPositionedXYZAxesToNew(pos: Vector3, xaxis: Vector3, yaxis: Vector3, zaxis: Vector3) {
	const matrix = new Matrix()
	fromPositionedXYZAxesToRef(pos, xaxis, yaxis, zaxis, matrix)
	return matrix
}
export function fromPositionedXYZAxesToRef(pos: Vector3, xaxis: Vector3, yaxis: Vector3, zaxis: Vector3, matrix: Matrix) {
	Matrix.FromValuesToRef(
		xaxis._x, xaxis._y, xaxis._z, 0.0,
		yaxis._x, yaxis._y, yaxis._z, 0.0,
		zaxis._x, zaxis._y, zaxis._z, 0.0,
		pos._x, pos._y, pos._z, 1.0,
		matrix
	);
}

export function fromPositionedQuaternionToNew(pos: Vector3, quat: Quaternion) {
	const matrix = new Matrix()
	fromPositionedQuaternionToRef(pos, quat, matrix)
	return matrix
}
export function fromPositionedQuaternionToRef(pos: Vector3, quat: Quaternion, matrix: Matrix) {
	const xx = quat._x * quat._x;
	const yy = quat._y * quat._y;
	const zz = quat._z * quat._z;
	const xy = quat._x * quat._y;
	const zw = quat._z * quat._w;
	const zx = quat._z * quat._x;
	const yw = quat._y * quat._w;
	const yz = quat._y * quat._z;
	const xw = quat._x * quat._w;
	Matrix.FromValuesToRef(
		1.0 - (2.0 * (yy + zz)),
		2.0 * (xy + zw),
		2.0 * (zx - yw),
		0.0,
		2.0 * (xy - zw),
		1.0 - (2.0 * (zz + xx)),
		2.0 * (yz + xw),
		0.0,
		2.0 * (zx + yw),
		2.0 * (yz - xw),
		1.0 - (2.0 * (yy + xx)),
		0.0,
		pos.x,
		pos.y,
		pos.z,
		1.0,
		matrix)
}

export const right = (m: Matrix) => new Vector3(m.m[0], m.m[1], m.m[2])
export const up = (m: Matrix) => new Vector3(m.m[4], m.m[5], m.m[6])
export const forward = (m: Matrix) => new Vector3(m.m[8], m.m[9], m.m[10])
export const position = (m: Matrix) => new Vector3(m.m[12], m.m[13], m.m[14])

export const setPosition = (matrix: Matrix, pos: Vector3) => {
	const m = (matrix as any)._m;
	m[12] = pos.x
	m[13] = pos.x
	m[14] = pos.x
	matrix._markAsUpdated()
}

// /**
//  * Transforms point from local to world coordinates
//  * @param m defines the matrix to use
//  * @param point the local point to be translated
//  * @returns the transformed Vector3
//  */
// export function transformPoint(m: Matrix, point: Vector3) {
// 	return Vector3.TransformCoordinates(point, m)
// }
// /**
//  * Transforms point from world to local coordinates. This is slow because it needs to create a world-to-local matrix.
//  * @param m defines the matrix to use
//  * @param point the local point to be translated
//  * @returns the transformed Vector3
//  */
// export function InverseTransformPointSlowly(m: Matrix, point: Vector3) {
// 	const mInv = new Matrix()
// 	m.invertToRef(mInv)
// 	return Vector3.TransformCoordinates(point, mInv)
// }

export function debug(m: Matrix, lines: DebugLines) {
	lines.addGizmo(position(m), right(m), up(m), forward(m))
}