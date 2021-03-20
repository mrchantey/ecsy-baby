import { IInspectorOptions } from "babylonjs";
import { SystemQueries } from "ecsy";
import { BabySystem } from "../../../types";
import { KeyValue } from "../../../utility";
import { Keyboard, SceneComp } from "../components";

export class ShortcutSystem extends BabySystem {
    execute() {

        const scene = this.getSingletonComponent(SceneComp).value
        const keyboard = this.getSingletonComponent(Keyboard)
        // console.dir(keyboard.keysDown);
        if (keyboard.keysPressed[KeyValue.Control] && keyboard.keysDown[KeyValue.KEY_B]) {

            if (scene.debugLayer.isVisible())
                scene.debugLayer.hide()
            else {
                const options: IInspectorOptions = {}

                options.overlay = true
                // options.showExplorer = 
                scene.debugLayer.show(options)
            }
        }
    }

    static queries: SystemQueries = {
    }
}