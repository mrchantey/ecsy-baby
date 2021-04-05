


import { TargetCamera, Vector3 } from "babylonjs";
import { SceneComp, TargetCameraComp } from "core/components";
import { Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "extra-ecsy";

export class InitCameraSystem extends ExtraSystem {
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                const scene = entity.getComponent(SceneComp)!.value
                const camera = new TargetCamera("camera", new Vector3(0, 0, -5), scene)
                entity.addComponent(TargetCameraComp, { value: camera })
            })
    }

    static queries: SystemQueries = {
        entities: {
            components: [SceneComp, Not(TargetCameraComp)]
        }
    }
}

// const createDefaultCamera: iCreateCamera = (scene: Scene, canvas: HTMLCanvasElement, world: ExtraWorld) => {
//     const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, new Vector3(0, 0, 0), scene);
//     camera.attachControl(canvas, true);
//     return camera
// }