
import { QuaternionExt, screenRay, TargetCameraComp, TransformNodeComp, Vector3Ext } from "core";
import { SystemQueries } from "ecsy";
import { ExtraSystem } from "ecsy-extra";
import { MouseFollow } from "interaction/components";

export class MouseFollowSystem extends ExtraSystem {
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                const ray = screenRay(this.world)
                const { offset, depth } = entity.getComponent(MouseFollow)!
                const camera = this.getSingletonComponent(TargetCameraComp)!.value
                const target = ray.direction
                    .scale(depth)
                    .add(ray.origin)

                const pos = camera.position
                    .add(offset)

                const dirTarget = target
                    .subtract(pos)


                const transform = entity.getComponent(TransformNodeComp)!.value
                transform.position = pos
                transform.rotationQuaternion = QuaternionExt.lookRotation(dirTarget)

            })
    }

    static queries: SystemQueries = {
        entities: {
            components: [TransformNodeComp, MouseFollow]
        }
    }
}