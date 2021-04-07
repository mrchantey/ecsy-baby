
import { HemisphericLight, MeshBuilder, Vector3 } from "babylonjs";
import { coreModule, CoreSystemPriority, EulerRotation, SceneComp } from "core";
import { Component, ComponentSchema, SystemQueries, Types } from "ecsy";
import { ExtraSystem, ExtraWorld, iModule, registerModules } from "ecsy-extra";

class CubeSpinComponent extends Component<CubeSpinComponent>{
    speed: number
    static schema: ComponentSchema = {
        speed: { default: 1, type: Types.Number }
    }
}

class CubeSpinSystem extends ExtraSystem {

    start() {
        const scene = this.getSingletonComponent(SceneComp)!.value
        const box = MeshBuilder.CreateBox("box", {}, scene)
        this.world.createEntity("box")
            .addComponent(CubeSpinComponent, { speed: 3 })
            .addComponent(EulerRotation, { value: box.rotation })
    }

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
    systemGroups: [{
        priority: CoreSystemPriority.BeforeRender,
        systems: [CubeSpinSystem]
    }],
}


const world = new ExtraWorld()
registerModules(world, [coreModule, cubeSpinModule])
world.start()
