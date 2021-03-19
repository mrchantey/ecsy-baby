import { SystemQueries } from "ecsy";
import { BabySystem } from "../../../types/system";
import { Mouse } from "../../core/components/Mouse";
import { TransformNodeComp } from "../../core";
import { ViewTool } from "../components/ViewTool";

export class ViewSystem extends BabySystem {
    execute(delta: number) {

        const mouse = this.getSingletonComponent(Mouse)
        const rotateSpeed = 3 * delta


        this.queries.entities.results
            .forEach((entity, index) => {
                console.log('gotem');

                const node = entity.getComponent(TransformNodeComp)!.value

                if (mouse.leftButtonHeld) {
                    const dx = mouse.xnorm - mouse.xDownNorm
                    const dy = mouse.ynorm - mouse.yDownNorm
                    // console.log(mouse.xsign);
                    node.rotation.x += -dy * rotateSpeed
                    node.rotation.y += dx * rotateSpeed
                }
            })
    }


    static queries: SystemQueries = {
        entities: {
            components: [TransformNodeComp, ViewTool]
        }
    }
}