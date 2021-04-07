import { Not, SystemQueries } from "ecsy";
import { Mouse } from "../../core/components/Mouse";
import { screenRay, TransformNodeComp } from "../../core";
import { ViewTool } from "../components/tools/ViewTool";
import { Interactor, MoveItemEvent, moveItemTool, SelectEvent } from "../components";
import { Vector3 } from "babylonjs";
import { ExtraSystem } from "../../ecsy-extra/index";

export class MoveItemSystem extends ExtraSystem {


    execute() {

        this.queries.interactorsSelecting
            .added?.forEach(entity => {
                // console.log('SOMETHING ADDED');
                console.dir(entity.getComponents());
                // const interactor = entity.getComponent(Interactor)!
                const tool = entity.getComponent(moveItemTool)!
                const selectEvent = entity.getComponent(SelectEvent)!
                // if (!selectEvent)
                //     return
                // console.dir(selectEvent);
                const interactableTransform = selectEvent.interactable.getComponent(TransformNodeComp)!.value
                const intersect = tool.plane.raycastPlane(screenRay(this.world))
                if (!intersect)
                    return
                const offset = intersect.subtract(interactableTransform.position)
                entity.addComponent(MoveItemEvent, { offset })
            });

        this.queries.interactorsSelectingAndMoving
            .removed?.forEach(entity => entity.removeComponent(MoveItemEvent))

        this.queries.interactorsSelectingAndMoving
            .results.forEach(entity => {
                // const interactor = entity.getComponent(Interactor)!
                const moveItemEvent = entity.getComponent(MoveItemEvent)!
                const tool = entity.getComponent(moveItemTool)!
                const selectEvent = entity.getComponent(SelectEvent)!
                const intersect = tool.plane.raycastPlane(screenRay(this.world))
                if (!intersect)
                    return
                const target = selectEvent.interactable.getComponent(TransformNodeComp)!.value
                target.position = intersect.subtract(moveItemEvent.offset)
            })
    }

    static queries: SystemQueries = {
        interactorsSelecting: {
            components: [TransformNodeComp, Interactor, SelectEvent, moveItemTool],
            listen: {
                added: true
            }
        },
        interactorsSelectingAndMoving: {
            components: [TransformNodeComp, Interactor, SelectEvent, moveItemTool, MoveItemEvent],
            listen: {
                removed: true
            }
        }
    }
}