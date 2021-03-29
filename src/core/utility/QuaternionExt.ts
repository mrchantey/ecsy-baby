import { Quaternion, Vector3, Matrix } from "babylonjs";
import { Vector3Ext } from "../";



export const angleAxis = (theta: number, axis: Vector3) => {
	const s = Math.sin(theta / 2);
	return new Quaternion(
		axis.x * s,
		axis.y * s,
		axis.z * s,
		Math.cos(theta / 2)
	)
}
export const lookRotation = (target: Vector3, up = new Vector3(0, 1, 0)) => {
	const matrix = Matrix.LookAtLH(Vector3.Zero(), target, up)
	matrix.invert()
	return Quaternion.FromRotationMatrix(matrix)
}

export const multiplyDirection = (quat: Quaternion, point: Vector3) => {
	const x = quat.x * 2;
	const y = quat.y * 2;
	const z = quat.z * 2;
	const xx = quat.x * x;
	const yy = quat.y * y;
	const zz = quat.z * z;
	const xy = quat.x * y;
	const xz = quat.x * z;
	const yz = quat.y * z;
	const wx = quat.w * x;
	const wy = quat.w * y;
	const wz = quat.w * z;

	const res = Vector3.Zero();
	res.x = (1 - (yy + zz)) * point.x + (xy - wz) * point.y + (xz + wy) * point.z;
	res.y = (xy + wz) * point.x + (1 - (xx + zz)) * point.y + (yz - wx) * point.z;
	res.z = (xz - wy) * point.x + (yz + wx) * point.y + (1 - (xx + yy)) * point.z;
	return res;
}

export const forward = (quat: Quaternion) => multiplyDirection(quat, Vector3.Forward())
export const up = (quat: Quaternion) => multiplyDirection(quat, Vector3.Up())
export const right = (quat: Quaternion) => multiplyDirection(quat, Vector3.Right())

