import { AbstractMesh, Color3, Matrix, Mesh, StandardMaterial } from "babylonjs";
import { Entity, Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "../../ecsyExtra/index";
import { Mouse, raycastMouse, SceneComp, StandardMaterialComp, TargetCameraComp, TransformNodeComp } from "../../core";
import { HoverEvent, Interactable, InteractionEvent, RaycastInteractionEvent, SelectEvent } from "interaction/components";


export class HoverSystem extends ExtraSystem {

    execute() {

        this.queries.entitiesReady.added!.forEach(entity => {
            entity.addComponent(HoverEvent)
            const mat = entity.getComponent(StandardMaterialComp)!.value
            mat.diffuseColor = new Color3(0, 1, 1)
            // console.log('HOVERED');

        })

        this.queries.entitiesSelectedHovered.added!.forEach(entity => {
            // console.log('it got selected');

            entity.removeComponent(HoverEvent)
        })

        // console.dir(this.)
        this.queries.entitiesActive.added!.forEach(entity => {
            entity.removeComponent(HoverEvent)
            const mat = entity.getComponent(StandardMaterialComp)!.value
            mat.diffuseColor = new Color3(1, 1, 1)
        })
    }

    static queries: SystemQueries = {
        entitiesReady: {
            components: [
                Interactable,
                RaycastInteractionEvent,
                StandardMaterialComp,
                Not(SelectEvent)
            ],
            listen: {
                added: true,
                removed: true
            }
        },
        entitiesSelectedHovered: {
            components: [
                Interactable,
                RaycastInteractionEvent,
                StandardMaterialComp,
                HoverEvent,
                SelectEvent
            ],
            listen: {
                added: true,
            }
        },
        entitiesActive: {
            components: [
                Interactable,
                StandardMaterialComp,
                HoverEvent,
                Not(RaycastInteractionEvent),
                Not(SelectEvent)
            ],
            listen: {
                added: true
            }
        }
    }
}