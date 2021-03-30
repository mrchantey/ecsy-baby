
import { HemisphericLight, MeshBuilder, Scene, StandardMaterial, TargetCamera, TransformNode, Vector3 } from "babylonjs";
import { Component, ComponentSchema, System, SystemQueries, Types } from "ecsy";
import { BabySystem, BabyWorld, iModule, SystemPriority } from "../../../src/base/index";
import { AdvancedPlane, MouseLook, Player, SceneComp, StandardMaterialComp, TransformNodeComp, initialize } from "../../../src/core/index";
import { Interactable, Interactor, moveItemTool, ToolEquipper, EquipToolEvent, ToolType, createInteractionModule } from "../../../src/interaction/index";


function createBox(world: BabyWorld, scene: Scene, position: Vector3, index: number) {

    const box = MeshBuilder.CreateBox("box", {}, scene)
    box.position.copyFrom(position)

    const mat = new StandardMaterial("mat", scene)
    box.material = mat

    world.createEntity(`interactable ${index}`)
        .addComponent(TransformNodeComp, { value: box })
        .addComponent(Interactable)
        .addComponent(StandardMaterialComp, { value: mat })

}


class BoxSpawnSystem extends BabySystem {

    init() {
        const scene = this.getSingletonComponent(SceneComp)!.value
        createBox(this.world, scene, new Vector3(-1, 0, 0), 1)
        createBox(this.world, scene, new Vector3(1, 0, 0), 2)

        const moveItemsEntity = this.world.createEntity("moveItemTool")
            .addComponent(moveItemTool, { plane: new AdvancedPlane(Vector3.Zero(), Vector3.Forward(), Vector3.Up()) })

        const player = this.world.entity.getComponent(Player)!.value
        player.addComponent(Interactor)
            .addComponent(ToolEquipper)
            .addComponent(EquipToolEvent, {
                toolType: ToolType.MoveItems,
                toolEntity: moveItemsEntity,
            })
        player.getMutableComponent(MouseLook)!.requireHoldAlt = true

    }


}


const testModule: iModule = {
    // components: [CubeSpinComponent],
    systems: [{
        priority: SystemPriority.BeforeRender,
        systems: [BoxSpawnSystem]
    }],
}


const modules = [
    testModule,
    createInteractionModule()
]


initialize({ modules })