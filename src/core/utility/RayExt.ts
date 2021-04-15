import { Ray, TransformNode } from "babylonjs";




export const fromTransformNode = (node: TransformNode) => new Ray(node.position, node.forward)