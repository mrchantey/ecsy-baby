
import { HemisphericLight, MeshBuilder, Vector3 } from "babylonjs";
import { Scene } from "babylonjs/scene";
import { Component, ComponentSchema, System, SystemQueries, Types } from "ecsy";
import { BabySystem, iModule, SystemPriority } from "../../../src/base/index";
import { EulerRotation, SceneComp } from "../../../src/core/index";
import { initialize } from "../../../src/core/initialize";

class CubeSpinComponent extends Component<CubeSpinComponent>{
    speed: number
    static schema: ComponentSchema = {
        speed: { default: 1, type: Types.Number }
    }
}

class CubeSpawnSystem extends BabySystem {

    init() {
        const scene = this.getSingletonComponent(SceneComp)!.value
        const box = MeshBuilder.CreateBox("box", {}, scene)
        this.world.createEntity("box")
            .addComponent(CubeSpinComponent, { speed: 3 })
            .addComponent(EulerRotation, { value: box.rotation })
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
        systems: [
            CubeSpawnSystem,
            CubeSpinSystem]
    }],
}


const { world } = initialize({ modules: [cubeSpinModule] })
// initialize()
// // world
// // 	.registerComponent(CubeSpinComponent)
// // 	.registerSystem(CubeSpinSystem)


