import { Color3, Matrix, Mesh, StandardMaterial } from "babylonjs";
import { Entity, SystemQueries } from "ecsy";
import { BabySystem } from "../../../types/system";
import { isEmpty } from "../../../utility/jsUtility";
import { CameraComp } from "../../core/components/Camera";
import { SceneComp } from "../../core/components/Scene";
import { TransformNodeComp } from "../../core/components/TransformNode";
import { Interactable } from "../components/Interactable";
import { Interactor } from "../components/Interactor";

export class InteractionSystem extends BabySystem {
    execute() {

        const scene = this.getSingletonComponent(SceneComp).scene
        const camera = this.getSingletonComponent(CameraComp).camera

        // const interactables = this.queries.interactables.results.map(entity=>({
        //     interactable:entity.getComponent
        // }))

        this.queries.interactors.results
            .forEach((entity, index) => {
                const interactor = entity.getMutableComponent(Interactor)!
                // const node = entity.getMutableComponent(TransformNode)!.value
                const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera)
                const hit = scene.pickWithRay(ray)

                if (hit && hit.pickedMesh) {
                    const interactableEntity = this.queries.interactables.results
                        .find(entity => entity.getComponent(TransformNodeComp)!.value === hit.pickedMesh)
                    this.tryStartHover(interactor, interactableEntity)
                }
            })
    }

    tryStartHover(interactor: Interactor, interactable: Entity | undefined) {
        if (interactor.isSelecting)
            return
        else if (interactor.currentInteraction === interactable)
            return
        else {
            this.tryEndHover(interactor)
            interactor.currentInteraction = interactable
            //interactor event
            //interactable event
            if (interactable !== undefined) {
                const mesh = interactable.getComponent(TransformNodeComp)!.value as Mesh
                const mat = mesh.material as StandardMaterial
                mat.diffuseColor = new Color3(0, 1, 1)
                interactor.isHovering = true
            }
        }
    }

    tryEndHover(interactor: Interactor) {
        if (!interactor.isHovering)
            return
        interactor.isHovering = false
        if (isEmpty(interactor.currentInteraction))
            return
        (<any>interactor.currentInteraction!.getComponent(TransformNodeComp)!.value).material.diffuseColor = new Color3(1, 1, 1)
    }

    static queries: SystemQueries = {
        interactors: {
            components: [TransformNodeComp, Interactor]
        },
        interactables: {
            components: [TransformNodeComp, Interactable]
        }
    }
}