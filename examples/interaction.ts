
import { MeshBuilder, Scene, StandardMaterial, TransformNode, Vector3 } from "babylonjs";
import { ExtraWorld, ExtraSystem, iModule, registerModules } from "ecsyExtra";
import { TransformNodeComp, StandardMaterialComp, SceneComp, AdvancedPlane, Player, MouseLook, CoreSystemPriority, coreModule } from "core";
import { Interactable, Interactor, ToolEquipper, EquipToolEvent, ToolType, interactionModule, MouseFollow } from "interaction";




function createBox(world: ExtraWorld, scene: Scene, position: Vector3, index: number) {

    const box = MeshBuilder.CreateBox("box", {}, scene)
    box.position.copyFrom(position)

    const mat = new StandardMaterial("mat", scene)
    box.material = mat

    world.createEntity(`interactable ${index}`)
        .addComponent(TransformNodeComp, { value: box })
        .addComponent(Interactable)
        .addComponent(StandardMaterialComp, { value: mat })

}


class BoxSpawnSystem extends ExtraSystem {

    start() {
        const scene = this.getSingletonComponent(SceneComp)!.value
        createBox(this.world, scene, new Vector3(-1, 0, 0), 1)
        createBox(this.world, scene, new Vector3(1, 0, 0), 2)


        const player = this.world.entity.getComponent(Player)!.value
        player.getMutableComponent(MouseLook)!.requireHoldAlt = true

        const box = MeshBuilder.CreateBox("box", { width: 0.3, height: 0.3, depth: 0.3 }, scene)
        const interactor = this.world
            .createEntity("interactor")
            .addComponent(MouseFollow)
            .addComponentValue(TransformNodeComp, box as TransformNode)
            .addComponent(Interactor)
            .addComponent(ToolEquipper)
            .addComponent(EquipToolEvent, {
                toolType: ToolType.MoveItems,
                toolParams: { plane: new AdvancedPlane(Vector3.Zero(), Vector3.Forward(), Vector3.Up()) }
            })
    }
}


const testModule: iModule = {
    // components: [CubeSpinComponent],
    systemGroups: [{
        priority: CoreSystemPriority.BeforeRender,
        systems: [BoxSpawnSystem]
    }],
}


const world = new ExtraWorld()
registerModules(world, [coreModule, interactionModule, testModule])
world.start()
