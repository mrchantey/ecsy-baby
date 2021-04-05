


import { TransformNode, Vector3 } from "babylonjs";
import { KeyboardMove, MouseLook, Player, SceneComp, TargetCameraComp, TransformNodeComp } from "core/components";
import { Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "extra-ecsy";

export class InitPlayerSystem extends ExtraSystem {
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                const scene = entity.getComponent(SceneComp)!.value
                const camera = entity.getComponent(TargetCameraComp)!.value
                const node = new TransformNode("player", scene)
                node.position = camera.position
                camera.parent = node
                camera.position = Vector3.Zero()

                const playerEntity = this.world.createEntity("player")
                    .addComponent(TargetCameraComp, { value: camera })
                    .addComponent(TransformNodeComp, { value: node })
                    .addComponent(MouseLook)
                    .addComponent(KeyboardMove)

                entity.addComponent(Player, { value: playerEntity })
            })
    }
    static queries: SystemQueries = {
        entities: {
            components: [SceneComp, Not(Player)]
        }
    }
}