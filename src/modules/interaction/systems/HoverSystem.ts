import { Color3, Matrix, Mesh, StandardMaterial } from "babylonjs";
import { Entity, SystemQueries } from "ecsy";
import { BabyWorld } from "../../../types";
import { BabySystem } from "../../../types/system";
import { raycastMouse } from "../../../utility";
import { Mouse, SceneComp, StandardMaterialComp, TargetCameraComp, TransformNodeComp } from "../../core";
import { Interactable } from "../components/Interactable";
import { Interactor } from "../components/Interactor";




export class HoverSystem extends BabySystem {
    execute() {
        const mouseStay = this.getSingletonComponent(Mouse).mouseStay

        this.queries.interactors.results
            .forEach((entity, index) => {
                const interactor = entity.getMutableComponent(Interactor)!
                const mesh = raycastMouse(this.world)?.pickedMesh
                if (mesh && mouseStay) {
                    const interactableEntity = this.queries.interactables.results
                        .find(entity => entity.getComponent(TransformNodeComp)!.value === mesh)
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



// void TryStartHover(Interactable interactable)
// {
//     if (isSelecting) return;
//     else if (interactable == currentInteraction)
//         return;
//     else
//     {
//         TryEndHover();
//         currentInteraction = interactable;
//         InvokeInteraction(StartHover, currentInteraction.StartHover);
//         isHovering = true;
//     }
// }


// void InvokeInteraction(InteractionFunc interactorEvent, InteractionFunc interactableEvent)
// {
//     var info = new InteractionInfo(this, currentInteraction);
//     interactorEvent(info);
//     interactableEvent(info);
// }

// void TryEndHover(Interactable interactable)
// {
//     if (interactable == currentInteraction)
//         TryEndHover();
// }

// void TryEndHover()
// {
//     if (!isHovering) return;
//     InvokeInteraction(EndHover, currentInteraction.EndHover);
//     isHovering = false;

//     currentInteraction = null;
// }
