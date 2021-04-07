import { AbstractMesh, Color3, Matrix, Mesh, StandardMaterial } from "babylonjs";
import { Entity, Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "../../ecsy-extra/index";
import { Mouse, raycastMouse, SceneComp, StandardMaterialComp, TargetCameraComp, TransformNodeComp } from "../../core";
import { HoverEvent, SelectEvent } from "../components";
import { Interactable } from "../components/Interactable";
import { Interactor } from "../components/Interactor";
import { InteractionEvent } from "interaction/components/events/InteractionEvent";


export class HoverSystem extends ExtraSystem {

    _interactionAdded: () => void
    _interactionRemoved: () => void

    execute() {
        // const mouseStay = this.getSingletonComponent(Mouse).mouseStay
        // if (!mouseStay) {
        //     this.tryEndAllHovers()
        //     return
        // }
        // // if (this.queries.interactors.results.length === 0)
        //     return

        this.queries.interactionEvents.added?.forEach(entity => {
            console.log('INTERACTION ADDED');
        })
        this.queries.interactionEvents.removed?.forEach(entity => {
            console.log('INTERACTION REMOVED');
        })

        // this.queries.interactors.results
        //     .forEach((entity, index) => {
        //         const mesh = raycastMouse(this.world, mesh => hoverables.some(h => h.mesh === mesh))?.pickedMesh
        //         if (!mesh) {
        //             return
        //         }
        //         // this.tryStartHover(entity, hoverables.find(h => h.mesh === mesh)!.entity)
        //     })
        //on no interaction
        // this.tryEndHover(entity)
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
        interactionEvents: {
            components: [Interactor, InteractionEvent],
            listen: {
                added: true,
                removed: true
            }
        },
        // interactors: {
        //     components: [TransformNodeComp, Interactor, Not(SelectEvent)]
        // },
        // interactorsHovering: {
        //     components: [TransformNodeComp, Interactor, HoverEvent]
        // },
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
