
import { Vector3 } from "babylonjs";
import { MatrixExt, Player, QuaternionExt, screenRay, TargetCameraComp, TransformNodeComp, Vector3Ext } from "core";
import { SystemQueries } from "ecsy";
import { ExtraSystem } from "ecsy-extra";
import { MouseFollow } from "interaction/components";

export class MouseFollowSystem extends ExtraSystem {
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                const ray = screenRay(this.world)
                const { offset, depth } = entity.getComponent(MouseFollow)!
                const player = this.getSingletonComponent(Player)!.value
                const playerNode = player.getComponent(TransformNodeComp)!.value

                const pos = Vector3.TransformCoordinates(offset, playerNode.computeWorldMatrix())


                const target = ray.direction
                    .scale(depth)
                    .add(ray.origin)

                const dirTarget = target
                    .subtract(pos)

                const transform = entity.getComponent(TransformNodeComp)!.value
                transform.setAbsolutePosition(pos)
                // transform.matrix
                // transform.rotationQuaternion = QuaternionExt.lookRotation(ray.direction)
                transform.rotationQuaternion = QuaternionExt.lookRotation(dirTarget)

            })
    }

    static queries: SystemQueries = {
        entities: {
            components: [TransformNodeComp, MouseFollow]
        }
    }
}