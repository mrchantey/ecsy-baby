import { AbstractMesh, Camera, Matrix, Scene } from "babylonjs"
import { Mesh } from "babylonjs/Meshes/mesh"
import { SceneComp, TargetCameraComp } from "core/components"
import { ExtraWorld } from "ecsy-extra"


type iPredicate = (mesh: AbstractMesh) => boolean


export function screenRay(world: ExtraWorld, scene?: Scene, camera?: Camera) {
    scene = scene || world.entity.getComponent(SceneComp)!.value
    camera = camera || world.entity.getComponent(TargetCameraComp)!.value
    return scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera)

}

export function raycastMouse(world: ExtraWorld, predicate?: iPredicate) {
    const scene = world.entity.getComponent(SceneComp)!.value
    const ray = screenRay(world, scene)
    const hit = scene.pickWithRay(ray, predicate)
    return hit as { pickedMesh?: AbstractMesh }
}