import { Color3, TransformNode } from "babylonjs";
import { Mouse, StandardMaterialComp, TransformNodeComp } from "core";
import { Entity, Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "ecsy-extra";
import { HoverEvent, Interactable, InteractionEvent, Interactor, SelectEvent } from "interaction/components";

export class SelectSystem extends ExtraSystem {
    execute() {
        const mouse = this.getSingletonComponent(Mouse)
        // console.dir(mouse.leftButtonDown);
        if (mouse.leftButtonDown)
            this.queries.interactablesReady.results
                .forEach(this.tryStartSelect)
        if (mouse.leftButtonUp || mouse.mouseOut)
            this.queries.interactablesSelecting.results
                .forEach(entity => this.tryEndSelect(entity))
    }

    tryStartSelect(interactable: Entity) {
        const { interactor } = interactable.getComponent(InteractionEvent)!
        interactor?.addComponent(SelectEvent)
        interactable.addComponent(SelectEvent)
        const mat = interactable.getComponent(StandardMaterialComp)!.value
        mat.diffuseColor = new Color3(0, 0, 1)
    }
    tryEndSelect(interactable: Entity) {
        const { interactor } = interactable.getComponent(InteractionEvent)!
        interactor?.removeComponent(SelectEvent)
        interactable.removeComponent(SelectEvent)

        const mat = interactable.getComponent(StandardMaterialComp)!.value
        mat.diffuseColor = new Color3(1, 1, 1)
    }

    static queries: SystemQueries = {
        interactablesReady: {
            components: [
                StandardMaterialComp,
                Interactable,
                InteractionEvent,
                Not(SelectEvent)
            ]
        },
        interactablesSelecting: {
            components: [
                StandardMaterialComp,
                SelectEvent
            ]
        },
    }
}