
import { HemisphericLight, MeshBuilder, Vector3 } from "babylonjs";
import { attachCanvas, CoreSystemPriority, EulerRotation, InitEngine, initialize, SceneComp } from "core";
import { Component, ComponentSchema, Not, System, SystemQueries, Types } from "ecsy";
import { ExtraSystem, iModule, SystemPriorityDelta } from "extra-ecsy";
class CubeSpawned extends Component<CubeSpawned>{ }

class CubeSpinComponent extends Component<CubeSpinComponent>{
    speed: number
    static schema: ComponentSchema = {
        speed: { default: 1, type: Types.Number }
    }
}

class CubeSpawnSystem extends ExtraSystem {

    init() {
    }


    execute() {
        this.queries.entities.results.forEach(entity => {
            const scene = entity.getComponent(SceneComp)!.value
            const box = MeshBuilder.CreateBox("box", {}, scene)
            this.world.createEntity("box")
                .addComponent(CubeSpinComponent, { speed: 3 })
                .addComponent(EulerRotation, { value: box.rotation })
            entity.addComponent(CubeSpawned)
        })
    }

    static queries: SystemQueries = {
        entities: {
            components: [SceneComp, Not(CubeSpawned)]
        }
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
    components: [
        CubeSpawned,
        CubeSpinComponent],
    systemGroups: [{
        priority: CoreSystemPriority.Render - SystemPriorityDelta,
        systems: [
            CubeSpawnSystem,
            CubeSpinSystem]
    }],
}

const world = initialize({ modules: [cubeSpinModule] })