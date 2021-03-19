import { Not, SystemQueries } from "ecsy";
import { BabySystem } from "../../../types/system";
import { Mouse } from "../../core/components/Mouse";
import { TransformNodeComp } from "../../core";
import { ViewTool } from "../components/ViewTool";
import { Interactor, MoveItemsTool, MoveItemAction } from "../components";
import { raycastMouse } from "../../../utility";
import { Vector3 } from "babylonjs";

export class MoveItemsSystem extends BabySystem {



    getHitPoint(interactor: Interactor) {
        const target = this.getTarget(interactor)
        return raycastMouse(this.world, (mesh) => mesh === target)?.pickedPoint
    }

    getTarget(interactor: Interactor) {
        return interactor.currentInteraction!.getComponent(TransformNodeComp)!.value
    }


    execute(delta: number) {
        this.queries.noAction.results.forEach(entity => {
            const interactor = entity.getComponent(Interactor)!
            if (!interactor.isSelecting)
                return
            const point = this.getHitPoint(interactor)
            if (!point)
                return
            entity.addComponent(MoveItemAction, { lastPoint: point })
        });


        this.queries.moveAction.results
            .forEach((entity, index) => {
                const interactor = entity.getComponent(Interactor)!
                if (!interactor.isSelecting) {
                    entity.removeComponent(MoveItemAction)
                    return
                }
                // console.log('pow0');

                const currentPoint = this.getHitPoint(interactor)
                if (!currentPoint)
                    return
                // console.log('pow1');

                const action = entity.getMutableComponent(MoveItemAction)!
                const deltaPos = currentPoint.subtract(action.lastPoint)
                console.log(deltaPos.toString());
                // deltaPos.scaleInPlace(10)
                // console.log(currentPoint);
                // console.log(action.lastPoint);

                const target = this.getTarget(interactor)
                // console.dir(target.position.toString());
                target.position.addInPlace(deltaPos)
                action.lastPoint = currentPoint
            })
    }


    static queries: SystemQueries = {
        noAction: {
            components: [TransformNodeComp, Interactor, MoveItemsTool, Not(MoveItemAction)]
        },
        moveAction: {
            components: [TransformNodeComp, Interactor, MoveItemsTool, MoveItemAction]
        }
    }
}