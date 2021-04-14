import { MeshBuilder, Vector3 } from "babylonjs";
import { coreModule, CoreSystemPriority, Mouse, MouseLook, Player, SceneComp, TransformNodeComp } from "core";
import { ExtraSystem, ExtraWorld, iModule, registerModules } from "ecsy-extra";
import { MouseFollow, MouseFollowSystem } from "interaction";

export class MainSystem extends ExtraSystem {
    start() {
        const scene = this.getSingletonComponent(SceneComp)!.value
        const box = MeshBuilder.CreateBox("box", { width: 0.3, height: 0.3, depth: 0.3 }, scene)
        const ground = MeshBuilder.CreateGround("ground", { width: 5, height: 5 }, scene)
        ground.position = new Vector3(0, -1, 0)
        this.world
            .createEntity("follower")
            .addComponent(TransformNodeComp, { value: box })
            .addComponent(MouseFollow,)

        const player = this.getSingletonComponent(Player)!.value
        player.getMutableComponent(MouseLook)!.requireHoldAlt = true
    }
}

// console.log('hello worlds!');


const testModule: iModule = {
    components: [MouseFollow],
    systemGroups: [{
        priority: CoreSystemPriority.BeforeRender,
        systems: [MouseFollowSystem, MainSystem]
    }]
}

const world = new ExtraWorld()
registerModules(world, [coreModule, testModule])


world.start()
