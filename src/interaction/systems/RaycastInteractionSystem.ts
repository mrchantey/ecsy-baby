import { raycastMouse, TransformNodeComp } from "core";
import { SystemQueries } from "ecsy";
import { ExtraSystem } from "ecsy-extra";
import { Interactable, Interactor } from "interaction/components";
import { InteractionEvent } from "interaction/components/events/InteractionEvent";

export class RaycastInteractionSystem extends ExtraSystem {
    //overwrite for testing
    static _raycastMouse = raycastMouse
    execute() {

        const interactables = this.queries.interactables.results
            .map(entity => ({ entity, mesh: entity.getComponent(TransformNodeComp)!.value }))


        this.queries.interactors.results.forEach(entity => {
            const value = entity.getComponent(TransformNodeComp)!.value
            const mesh = RaycastInteractionSystem._raycastMouse(this.world,
                mesh => interactables.some(i => i.mesh === mesh))?.pickedMesh
            const interactable = interactables.find(h => h.mesh === mesh)?.entity


            //continue interaction
            if (entity.getComponent(InteractionEvent)?.interactable === interactable)
                return
            //end interaction
            entity.removeComponent(InteractionEvent)
            //begin interaction
            if (interactable !== undefined)
                entity.addComponent(InteractionEvent, { interactable })
        })
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