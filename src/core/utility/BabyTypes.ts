import {
	Frustum as _Frustum,
	Plane as _Plane,
	Quaternion as _Quaternion,
	Ray as _Ray,
	Vector2 as _Vector2,
	Vector3 as _Vector3,
	Vector4 as _Vector4,
	Matrix as _Matrix,
	Color3 as _Color3,
	Color4 as _Color4,
} from "babylonjs";
import { defineClonableType } from "../../extra-ecsy/index";

export const Frustum = defineClonableType("Frustum", _Frustum);
export const Plane = defineClonableType("Plane", _Plane);
export const Quaternion = defineClonableType("Quaternion", _Quaternion);
export const Ray = defineClonableType("Ray", _Ray);
export const Vector2 = defineClonableType("Vector2", _Vector2);
export const Vector3 = defineClonableType("Vector3", _Vector3);
export const Vector4 = defineClonableType("Vector4", _Vector4);
export const Matrix = defineClonableType("Matrix", _Matrix);
export const Color3 = defineClonableType("Color3", _Color3);
export const Color4 = defineClonableType("Color4", _Color4);
