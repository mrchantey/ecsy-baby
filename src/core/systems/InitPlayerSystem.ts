


import { TransformNode, Vector3 } from "babylonjs";
import { KeyboardMove, MouseLook, Player, SceneComp, TargetCameraComp, TransformNodeComp } from "core/components";
import { ExtraSystem } from "ecsy-extra";

export class InitPlayerSystem extends ExtraSystem {
    start() {
        const scene = this.getSingletonComponent(SceneComp)!.value
        const camera = this.getSingletonComponent(TargetCameraComp)!.value
        const node = new TransformNode("player", scene)
        node.position = camera.position
        camera.parent = node
        camera.position = Vector3.Zero()

        const playerEntity = this.world.createEntity("player")
            .addComponent(TargetCameraComp, { value: camera })
            .addComponent(TransformNodeComp, { value: node })
            .addComponent(MouseLook)
            .addComponent(KeyboardMove)

        this.addSingletonComponent(Player, { value: playerEntity })
    }
}