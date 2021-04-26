import { Scene } from "babylonjs";
import { EngineComp, SceneComp, SceneOptionsComp } from "core/components";
import { ExtraSystem } from "ecsyExtra";

export class InitSceneSystem extends ExtraSystem {
    start() {
        const engine = this.getSingletonComponent(EngineComp)!.value

        const sceneOptions = this.getSingletonComponent(SceneOptionsComp)?.value
        const scene = new Scene(engine, sceneOptions)
        scene.onDispose = () => this.world.dispose()
        this.addSingletonComponent(SceneComp, { value: scene })
    }

}