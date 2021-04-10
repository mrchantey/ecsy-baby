import { AbstractMesh, Color3, Matrix, Mesh, StandardMaterial } from "babylonjs";
import { Entity, Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "../../ecsy-extra/index";
import { Mouse, raycastMouse, SceneComp, StandardMaterialComp, TargetCameraComp, TransformNodeComp } from "../../core";
import { HoverEvent, Interactable, InteractionEvent, SelectEvent } from "interaction/components";


export class HoverSystem extends ExtraSystem {

    execute() {

        this.queries.interactablesBusy.added!.forEach(entity => {
            const mat = entity.getComponent(StandardMaterialComp)!.value
            mat.diffuseColor = new Color3(0, 1, 1)
        })
        this.queries.interactablesBusy.removed!.forEach(entity => {
            const mat = entity.getComponent(StandardMaterialComp)!.value
            mat.diffuseColor = new Color3(1, 1, 1)
        })
    }

    static queries: SystemQueries = {
        interactablesBusy: {
            components: [
                Interactable,
                InteractionEvent,
                StandardMaterialComp,
                Not(SelectEvent)
            ],
            listen: {
                added: true,
                removed: true
            }
        },
    }
}