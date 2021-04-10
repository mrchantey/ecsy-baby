import { TransformNode } from "babylonjs";
import { raycastMouse, TransformNodeComp } from "core";
import { Not, SystemQueries } from "ecsy";
import { ExtraEntity, ExtraSystem } from "ecsy-extra";
import { Interactable, Interactor, InteractionEvent } from "interaction/components";






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
        interactor.addComponent(InteractionEvent, interactionEvent)
        interactable.addComponent(InteractionEvent, interactionEvent)
    }

    endInteraction(interactor: ExtraEntity, interactable: ExtraEntity) {
        interactor.removeComponent(InteractionEvent)
        interactable.removeComponent(InteractionEvent)
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
        const validInteractables = this.queries.interactablesIdle.results
            .map(entity => ({ entity, mesh: entity.getComponent(TransformNodeComp)!.value }))
        const raycastedInteractable = this.getRaycastedInteractable(validInteractables)

        this.queries.interactorsBusy.results.forEach(entity => {
            const { interactable } = entity.getComponent(InteractionEvent)!
            if (raycastedInteractable === undefined)
                this.endInteraction(entity, interactable)
            else if (raycastedInteractable !== interactable) {
                this.endInteraction(entity, interactable)
                this.startInteraction(entity, raycastedInteractable)
            }
        })



        this.queries.interactorsIdle.results.forEach(entity => {
            if (raycastedInteractable !== undefined)
                this.startInteraction(entity, raycastedInteractable)
        })
    }

    static queries: SystemQueries = {
        interactorsIdle: {
            components: [TransformNodeComp, Interactor, Not(InteractionEvent)]
        },
        interactorsBusy: {
            components: [TransformNodeComp, Interactor, InteractionEvent]
        },
        interactablesIdle: {
            components: [TransformNodeComp, Interactable, Not(InteractionEvent)]
        },
        interactablesBusy: {
            components: [TransformNodeComp, Interactable, InteractionEvent]
        },
    }
}