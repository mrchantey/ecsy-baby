import { TransformNode } from "babylonjs";
import { raycastMouse, TransformNodeComp } from "core";
import { Not, SystemQueries } from "ecsy";
import { ExtraEntity, ExtraSystem } from "ecsy-extra";
import { Interactable, Interactor, InteractionEvent, RaycastInteractionEvent, SelectEvent } from "interaction/components";






export class RaycastInteractionSystem extends ExtraSystem {
    //overwrite for testing
    static _raycastMouse = raycastMouse
    getRaycastedInteractable(validInteractables: { entity: ExtraEntity, mesh: TransformNode }[]) {
        const mesh = RaycastInteractionSystem._raycastMouse(this.world,
            mesh => validInteractables.some(i => i.mesh === mesh))?.pickedMesh
        return validInteractables.find(h => h.mesh === mesh)?.entity
    }


    startInteraction(interactor: ExtraEntity, interactable: ExtraEntity) {
        const interactionEvent = { interactor, interactable }
        interactor.setComponent(InteractionEvent, interactionEvent)
        interactable.setComponent(InteractionEvent, interactionEvent)
        interactor.setComponent(RaycastInteractionEvent)
        interactable.setComponent(RaycastInteractionEvent)
    }

    endInteraction(interactor: ExtraEntity, interactable: ExtraEntity) {
        interactor.removeComponent(RaycastInteractionEvent)
        interactable.removeComponent(RaycastInteractionEvent)
    }

    // endAllInteractions() {
    //     this.queries.interactorsHovering.results.forEach(i => this.tryEndHover(i))
    // }
    execute() {
        // const mouseStay = this.getSingletonComponent(Mouse).mouseStay
        // if (!mouseStay) {
        //     this.tryEndAllHovers()
        //     return
        // }
        const interactables = this.queries.interactables.results
            .map(entity => ({ entity, mesh: entity.getComponent(TransformNodeComp)!.value }))
        const raycastedInteractable = this.getRaycastedInteractable(interactables)

        this.queries.interactorsActive.results.forEach(entity => {
            const { interactable } = entity.getComponent(InteractionEvent)!
            if (raycastedInteractable === undefined)
                this.endInteraction(entity, interactable)
            else if (raycastedInteractable !== interactable) {
                this.endInteraction(entity, interactable)
                this.startInteraction(entity, raycastedInteractable)
            }
        })


        // console.dir(raycastedInteractable);

        this.queries.interactorsReady.results.forEach(entity => {
            if (raycastedInteractable !== undefined)
                this.startInteraction(entity, raycastedInteractable)
        })
    }

    static queries: SystemQueries = {
        interactorsReady: {
            components: [Interactor, Not(InteractionEvent)]
        },
        interactorsActive: {
            components: [
                TransformNodeComp,
                Interactor,
                InteractionEvent,
                Not(SelectEvent)
            ]
        },
        interactables: {
            components: [TransformNodeComp, Interactable]
        },
    }
}