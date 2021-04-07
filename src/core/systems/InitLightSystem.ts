import { HemisphericLight, Vector3 } from "babylonjs";
import { HemisphericLightComp, SceneComp } from "core/components";
import { ExtraSystem } from "ecsy-extra";

export class InitLightSystem extends ExtraSystem {
    start() {
        const scene = this.getSingletonComponent(SceneComp)!.value
        const light = new HemisphericLight("light", new Vector3(0, 10, -5), scene)
        this.addSingletonComponent(HemisphericLightComp, { value: light })
    }
}