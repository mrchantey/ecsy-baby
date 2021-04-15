import { TransformNode } from "babylonjs";
import { RayExt, SceneComp, TransformNodeComp } from "core";
import { Not, SystemQueries } from "ecsy";
import { ExtraEntity, ExtraSystem } from "ecsy-extra";
import { Interactable, Interactor, InteractionEvent, RaycastInteractionEvent, SelectEvent } from "interaction/components";






export class RaycastInteractionSystem extends ExtraSystem {
    //overwrite for testing
    getRaycastedInteractable(interactor: ExtraEntity, validInteractables: { entity: ExtraEntity, mesh: TransformNode }[]) {
        const node = interactor.getComponent(TransformNodeComp)!.value
        const scene = this.getSingletonComponent(SceneComp)!.value
        const ray = RayExt.fromTransformNode(node)
        const mesh = scene.pickWithRay(ray, mesh => validInteractables.some(i => i.mesh === mesh))?.pickedMesh
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

        this.queries.interactorsActive.results.forEach(interactor => {
            const raycastedInteractable = this.getRaycastedInteractable(interactor, interactables)
            const { interactable } = interactor.getComponent(InteractionEvent)!
            if (raycastedInteractable === undefined)
                this.endInteraction(interactor, interactable)
            else if (raycastedInteractable !== interactable) {
                this.endInteraction(interactor, interactable)
                this.startInteraction(interactor, raycastedInteractable)
            }
        })


        // console.dir(raycastedInteractable);

        this.queries.interactorsReady.results.forEach(interactor => {
            const raycastedInteractable = this.getRaycastedInteractable(interactor, interactables)
            if (raycastedInteractable !== undefined)
                this.startInteraction(interactor, raycastedInteractable)
        })
    }

    static queries: SystemQueries = {
        interactorsReady: {
            components: [TransformNodeComp, Interactor, Not(InteractionEvent)]
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