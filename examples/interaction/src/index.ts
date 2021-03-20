
import { HemisphericLight, MeshBuilder, Scene, StandardMaterial, TargetCamera, TransformNode, Vector3 } from "babylonjs";
import { Component, ComponentSchema, System, SystemQueries, Types } from "ecsy";
import { AdvancedPlane, BabyWorld, iModule, initialize } from "../../../src";
import { TransformNodeComp, TargetCameraComp, iCreateCamera, StandardMaterialComp, Player, MouseLook } from "../../../src/modules/core";
import { Interactable, Interactor, createInteractionModule, ToolEquipper, moveItemTool, EquipToolEvent, ToolType } from "../../../src/modules/interaction";


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



const testModule: iModule = {
    // components: [CubeSpinComponent],
    // systems: [{
    // 	priority: SystemPriority.BeforeRender,
    // 	systems: [CubeSpinSystem]
    // }],
    onSystemsRegistered: (world, scene) => {

        createBox(world, scene, new Vector3(-1, 0, 0), 1)
        createBox(world, scene, new Vector3(1, 0, 0), 2)

        const moveItemsEntity = world.createEntity("moveItemTool")
            .addComponent(moveItemTool, { plane: new AdvancedPlane(Vector3.Zero(), Vector3.Forward(), Vector3.Up()) })

        const player = world.entity.getComponent(Player)!.value
        player.addComponent(Interactor)
            .addComponent(ToolEquipper)
            .addComponent(EquipToolEvent, {
                toolType: ToolType.MoveItems,
                toolEntity: moveItemsEntity,
            })
        player.getMutableComponent(MouseLook)!.requireHoldAlt = true
    }
}


const modules = [
    testModule,
    createInteractionModule()
]


const { scene, world } = initialize({ modules })