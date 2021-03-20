import { SystemQueries } from "ecsy";
import { BabySystem } from "../../../types/system";
import { Mouse } from "../components/Mouse";
import { TransformNodeComp } from "..";
import { Keyboard, MouseLook } from "../components";
import { KeyValue } from "../../../utility";

export class MouseLookSystem extends BabySystem {
    execute(delta: number) {

        const mouse = this.getSingletonComponent(Mouse)
        const keyboard = this.getSingletonComponent(Keyboard)

        if (!mouse.mouseStay)
            return

        this.queries.entities.results
            .forEach((entity, index) => {

                const node = entity.getComponent(TransformNodeComp)!.value
                const mouseLook = entity.getComponent(MouseLook)!

                // console.log(keybpard);
                if (mouseLook.requireHoldAlt && !keyboard.keysPressed[KeyValue.Alt])
                    return
                if (mouse.leftButtonHeld) {
                    node.rotation.x += -mouse.ydelta * delta * mouseLook.speed
                    node.rotation.y += mouse.xdelta * delta * mouseLook.speed
                }
            })
    }


    static queries: SystemQueries = {
        entities: {
            components: [TransformNodeComp, MouseLook]
        }
    }
}