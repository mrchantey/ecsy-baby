import { HemisphericLight, Vector3 } from "babylonjs";
import { HemisphericLightComp, SceneComp } from "core/components";
import { Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "extra-ecsy";

export class InitLightSystem extends ExtraSystem {
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                const scene = entity.getComponent(SceneComp)!.value
                const light = new HemisphericLight("light", new Vector3(0, 10, -5), scene)
                entity.addComponent(HemisphericLightComp, { value: light })
            })
    }

    static queries: SystemQueries = {
        entities: {
            components: [SceneComp, Not(HemisphericLightComp)]
        }
    }
}