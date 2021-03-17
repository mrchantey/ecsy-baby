import { createType, copyCopyable, cloneClonable } from "ecsy";
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

import { BabyEvent as _BabyEvent } from '../utility/BabyEvent';

function babyCopyCopyable(src: any, dest: any) {
	if (!src) {
		return src;
	}

	if (!dest) {
		return src.clone();
	}
	return dest.copyFrom(src);//copyFrom, not copy
};

function defineClonableType(ClassName: string, BabylonClass: any) {
	return createType({
		name: ClassName,
		default: new BabylonClass(),
		// copy: copyCopyable,
		copy: babyCopyCopyable,
		clone: cloneClonable,
	});
}


// class CopyableVector3 extends _Vector2{
// 	copy(other:_Vector3){
// 		this.cop
// 	}
// }

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

export const BabyEvent = defineClonableType("BabyEvent", _BabyEvent);
