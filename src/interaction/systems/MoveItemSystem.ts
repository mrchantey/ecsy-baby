import { TransformNode, Vector3 } from "babylonjs";
import { TransformNodeComp, screenRay, AdvancedPlane } from "core";
import { Not, SystemQueries } from "ecsy";
import { ExtraEntity, ExtraSystem } from "ecsy-extra";
import { MoveItemTool, InteractionEvent, MoveItemEvent, Interactor, SelectEvent } from "interaction/components";

export class MoveItemSystem extends ExtraSystem {

    //testing hack
    static _screenRay = screenRay

    execute() {

        this.queries.entitiesReady
            .added?.forEach(entity => {
                const { interactable } = entity.getComponent(InteractionEvent)!
                const interactableNode = interactable.getComponent(TransformNodeComp)!.value
                const { plane } = entity.getComponent(MoveItemTool)!
                this.startMoveItem(entity, interactableNode, plane)
            });

        this.queries.entitiesActive
            .removed?.forEach(entity => entity.removeComponent(MoveItemEvent))

        this.queries.entitiesActive
            .results.forEach(entity => {
                const { interactable } = entity.getComponent(InteractionEvent)!
                const interactableNode = interactable.getComponent(TransformNodeComp)!.value
                const { plane } = entity.getComponent(MoveItemTool)!
                const { offset } = entity.getComponent(MoveItemEvent)!
                this.continueMoveItem(interactableNode, plane, offset)
            })
        // console.log('begin');
    }

    startMoveItem(interactor: ExtraEntity, interactableNode: TransformNode, plane: AdvancedPlane) {
        const intersect = plane.raycastPlane(MoveItemSystem._screenRay(this.world))
        if (!intersect)
            return

        const offset = intersect.subtract(interactableNode.position)
        interactor.addComponent(MoveItemEvent, { offset })
    }

    continueMoveItem(interactableNode: TransformNode, plane: AdvancedPlane, offset: Vector3) {
        const intersect = plane.raycastPlane(MoveItemSystem._screenRay(this.world))
        if (!intersect)
            return
        const newPos = intersect.subtract(offset)
        interactableNode.position = newPos
    }

    static queries: SystemQueries = {
        entitiesReady: {
            components: [
                Interactor, InteractionEvent, SelectEvent, MoveItemTool],
            listen: {
                added: true
            }
        },
        entitiesActive: {
            components: [
                Interactor, InteractionEvent, SelectEvent, MoveItemTool,
                MoveItemEvent
            ],
            listen: {
                removed: true
            }
        }
    }
}