import { IInspectorOptions } from "babylonjs";
import { SystemQueries } from "ecsy";
import { BabySystem } from "../../../types";
import { KeyValue } from "../../../utility";
import { Keyboard, SceneComp } from "../components";
import { DebugPanel } from "../components/DebugPanel";

export class ShortcutSystem extends BabySystem {
    execute() {

        const keyboard = this.getSingletonComponent(Keyboard)
        if (keyboard.keysPressed[KeyValue.Control] && keyboard.keysDown[KeyValue.KEY_B]) {
            const scene = this.getSingletonComponent(SceneComp).value
            const panel = this.getMutableSingletonComponent(DebugPanel)
            if (panel.isVisible)
                // if (scene.debugLayer.isVisible())
                scene.debugLayer.hide()
            else {
                const options: IInspectorOptions = {}
                options.overlay = true
                scene.debugLayer.show(options)
            }
            panel.isVisible = !panel.isVisible
        }
    }

    static queries: SystemQueries = {
    }
}