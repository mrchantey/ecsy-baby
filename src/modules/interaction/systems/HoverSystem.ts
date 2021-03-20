import { AbstractMesh, Color3, Matrix, Mesh, StandardMaterial } from "babylonjs";
import { Entity, Not, SystemQueries } from "ecsy";
import { BabyEntity, BabyWorld } from "../../../types";
import { BabySystem } from "../../../types/system";
import { raycastMouse } from "../../../utility";
import { Mouse, SceneComp, StandardMaterialComp, TargetCameraComp, TransformNodeComp } from "../../core";
import { HoverEvent, SelectEvent } from "../components";
import { Interactable } from "../components/Interactable";
import { Interactor } from "../components/Interactor";


export class HoverSystem extends BabySystem {
    execute() {
        const mouseStay = this.getSingletonComponent(Mouse).mouseStay
        if (!mouseStay) {
            this.tryEndAllHovers()
            return
        }
        if (this.queries.interactors.results.length === 0)
            return

        const hoverables = this.queries.hoverables.results
            .map(entity => ({ entity, mesh: entity.getComponent(TransformNodeComp)!.value }))
        this.queries.interactors.results
            .forEach((entity, index) => {
                const mesh = raycastMouse(this.world, mesh => hoverables.some(h => h.mesh === mesh))?.pickedMesh
                if (!mesh) {
                    this.tryEndHover(entity)
                    return
                }

                this.tryStartHover(entity, hoverables.find(h => h.mesh === mesh)!.entity)
            })
    }

    tryStartHover(interactor: Entity, interactable: Entity) {
        // console.dir(interactable);
        const hoverEvent = interactor.getComponent(HoverEvent)
        if (hoverEvent?.interactable === interactable)
            return
        else {
            this.tryEndHover(interactor)
            if (interactable !== undefined) {
                const mat = interactable.getComponent(StandardMaterialComp)!.value
                mat.diffuseColor = new Color3(0, 1, 1)
                interactor.addComponent(HoverEvent, { interactable })
            }
        }
    }

    tryEndAllHovers() {
        this.queries.interactorsHovering.results.forEach(i => this.tryEndHover(i))
    }

    tryEndHover(interactor: Entity, hoverEvent?: HoverEvent) {
        hoverEvent = hoverEvent || interactor.getComponent(HoverEvent)
        if (!hoverEvent)
            return
        const mat = hoverEvent.interactable.getComponent(StandardMaterialComp)!.value
        mat.diffuseColor = new Color3(1, 1, 1)
        interactor.removeComponent(HoverEvent)
    }

    static queries: SystemQueries = {
        interactors: {
            components: [TransformNodeComp, Interactor, Not(SelectEvent)]
        },
        interactorsHovering: {
            components: [TransformNodeComp, Interactor, HoverEvent]
        },
        hoverables: {
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
