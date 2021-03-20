
import { HemisphericLight, MeshBuilder, Scene, StandardMaterial, TargetCamera, TransformNode, Vector3 } from "babylonjs";
import { Component, ComponentSchema, System, SystemQueries, Types } from "ecsy";
import { AdvancedPlane, BabyWorld, iModule, initialize } from "../../../src";
import { TransformNodeComp, TargetCameraComp, iCreateCamera, StandardMaterialComp } from "../../../src/modules/core";
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

        const node = new TransformNode("interactor", scene)
        const camera = world.entity.getComponent(TargetCameraComp)!.value
        camera.parent = node

        const moveItemsEntity = world.createEntity("moveItemTool")
            .addComponent(moveItemTool, { plane: new AdvancedPlane(Vector3.Zero(), Vector3.Forward(), Vector3.Up()) })

        // const moveItemTool 

        world.createEntity("interactor")
            .addComponent(TransformNodeComp, { value: node })
            .addComponent(Interactor)
            .addComponent(ToolEquipper)
            .addComponent(EquipToolEvent, {
                toolType: ToolType.MoveItems,
                toolEntity: moveItemsEntity,
            })


        // world.entity.addComponent(CurrentTool, { tool: Tool.MoveItems })

        node.position = new Vector3(0, 0, -5)
    }
}


const modules = [
    testModule,
    createInteractionModule()
]

const createCamera: iCreateCamera = (scene, canvas, world) => {
    const camera = new TargetCamera("camera", Vector3.Zero(), scene)
    // world.createEntity("interactor")
    return camera
}

const { scene, world } = initialize({ modules, createCamera })
// world
// 	.registerComponent(CubeSpinComponent)
// 	.registerSystem(CubeSpinSystem)


