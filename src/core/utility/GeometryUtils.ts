import { AbstractMesh, Camera, Matrix, Scene } from "babylonjs"
import { BabyWorld } from "../../base"
import { SceneComp, TargetCameraComp } from "../index"


type iPredicate = (mesh: AbstractMesh) => boolean


export function screenRay(world: BabyWorld, scene?: Scene, camera?: Camera) {
    scene = scene || world.entity.getComponent(SceneComp)!.value
    camera = camera || world.entity.getComponent(TargetCameraComp)!.value
    return scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera)

}

export function raycastMouse(world: BabyWorld, predicate?: iPredicate) {
    const scene = world.entity.getComponent(SceneComp)!.value
    const ray = screenRay(world, scene)
    const hit = scene.pickWithRay(ray, predicate)
    return hit
}