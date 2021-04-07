import { TargetCamera, Vector3 } from "babylonjs";
import { SceneComp, TargetCameraComp } from "core/components";
import { ExtraSystem } from "ecsy-extra";

export class InitCameraSystem extends ExtraSystem {
    start() {
        const scene = this.getSingletonComponent(SceneComp)!.value
        const camera = new TargetCamera("camera", new Vector3(0, 0, -5), scene)
        this.addSingletonComponent(TargetCameraComp, { value: camera })
    }
}

// const createDefaultCamera: iCreateCamera = (scene: Scene, canvas: HTMLCanvasElement, world: ExtraWorld) => {
//     const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, new Vector3(0, 0, 0), scene);
//     camera.attachControl(canvas, true);
//     return camera
// }