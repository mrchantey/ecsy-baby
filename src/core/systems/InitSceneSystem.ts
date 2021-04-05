import { Scene } from "babylonjs";
import { Canvas, EngineComp, SceneComp, SceneOptionsComp } from "core/components";
import { Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "extra-ecsy";

export class InitSceneSystem extends ExtraSystem {
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                const canvas = entity.getComponent(Canvas)!.value
                const engine = entity.getComponent(EngineComp)!.value

                const sceneOptions = entity.getComponent(SceneOptionsComp)?.value
                const scene = new Scene(engine, sceneOptions)
                scene.onDispose = () => this.world.dispose()
                entity.addComponent(SceneComp, { value: scene })
            })
    }

    static queries: SystemQueries = {
        entities: {
            components: [Canvas, EngineComp, Not(SceneComp)]
        }
    }
}