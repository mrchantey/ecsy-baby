import { Color3, Matrix, Mesh, StandardMaterial } from "babylonjs";
import { Entity, SystemQueries } from "ecsy";
import { BabySystem } from "../../../types/system";
import { isEmpty } from "../../../utility/jsUtility";
import { SceneComp, StandardMaterialComp, TargetCameraComp, TransformNodeComp } from "../../core";
import { Interactable } from "../components/Interactable";
import { Interactor } from "../components/Interactor";

export class InteractionSystem extends BabySystem {
    execute() {

        const scene = this.getSingletonComponent(SceneComp)!.value
        const camera = this.getSingletonComponent(TargetCameraComp)!.value

        this.queries.interactors.results
            .forEach((entity, index) => {
                const interactor = entity.getMutableComponent(Interactor)!
                const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera)
                const hit = scene.pickWithRay(ray)

                if (hit && hit.pickedMesh) {
                    const interactableEntity = this.queries.interactables.results
                        .find(entity => entity.getComponent(TransformNodeComp)!.value === hit.pickedMesh)
                    this.tryStartHover(interactor, interactableEntity)
                } else {
                    this.tryEndHover(interactor)
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
                const mat = interactable.getComponent(StandardMaterialComp)!.value
                mat.diffuseColor = new Color3(0, 1, 1)
                interactor.isHovering = true
            }
        }
    }

    tryEndHover(interactor: Interactor) {
        if (!interactor.isHovering)
            return
        interactor.isHovering = false
        if (!interactor.currentInteraction)
            return
        const mat = interactor.currentInteraction!.getComponent(StandardMaterialComp)!.value
        mat.diffuseColor = new Color3(1, 1, 1)
        interactor.currentInteraction = undefined
    }

    static queries: SystemQueries = {
        interactors: {
            components: [TransformNodeComp, Interactor]
        },
        interactables: {
            components: [Interactable, TransformNodeComp, StandardMaterialComp]
        }
    }
}