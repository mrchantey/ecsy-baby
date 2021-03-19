import { AbstractMesh, Matrix } from "babylonjs"
import { BabyWorld } from ".."
import { SceneComp, TargetCameraComp } from "../modules/core"


type iPredicate = (mesh: AbstractMesh) => boolean

export function raycastMouse(world: BabyWorld, predicate?: iPredicate) {
    const scene = world.entity.getComponent(SceneComp)!.value
    const camera = world.entity.getComponent(TargetCameraComp)!.value

    const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera)
    const hit = scene.pickWithRay(ray, predicate)
    return hit
}