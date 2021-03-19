
import { HemisphericLight, MeshBuilder, Vector3 } from "babylonjs";
import { Component, ComponentSchema, System, SystemQueries, Types } from "ecsy";
import { iModule, initialize, SystemPriority } from "../../../src";
import { EulerRotation, SceneComp } from "../../../src/modules/core";

class CubeSpinComponent extends Component<CubeSpinComponent>{
    speed: number
    static schema: ComponentSchema = {
        speed: { default: 1, type: Types.Number }
    }
}

class CubeSpinSystem extends System {
    execute(delta: number) {
        // console.log('pow');


        this.queries.entities.results.forEach(entity => {
            const cubeSpin = entity.getComponent(CubeSpinComponent)!
            const eulerRotation = entity.getComponent(EulerRotation)!
            eulerRotation.value.x += 0.5 * delta * cubeSpin.speed;
            eulerRotation.value.y += 0.1 * delta * cubeSpin.speed;



        })
    }
    static queries: SystemQueries = {
        entities: {
            components: [CubeSpinComponent, EulerRotation]
        }
    }
}


const cubeSpinModule: iModule = {
    components: [CubeSpinComponent],
    systems: [{
        priority: SystemPriority.BeforeRender,
        systems: [CubeSpinSystem]
    }],
    onSystemsRegistered: (world, scene) => {
        const box = MeshBuilder.CreateBox("box", {}, scene)
        world.createEntity("box")
            .addComponent(CubeSpinComponent, { speed: 3 })
            .addComponent(EulerRotation, { value: box.rotation })
    }
}


const { scene, world } = initialize({ modules: [cubeSpinModule] })
// initialize()
// // world
// // 	.registerComponent(CubeSpinComponent)
// // 	.registerSystem(CubeSpinSystem)


