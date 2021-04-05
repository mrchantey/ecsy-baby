import { Color3, TransformNode } from "babylonjs";
import { Entity, Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "../../extra-ecsy/index";
import { Mouse, StandardMaterialComp, TransformNodeComp } from "../../core";
import { HoverEvent, Interactable, Interactor, SelectEvent } from "../components";

export class SelectSystem extends ExtraSystem {
    execute() {
        const mouse = this.getSingletonComponent(Mouse)
        if (mouse.leftButtonDown)
            this.queries.interactorsHovering.results
                .forEach(entity => this.tryStartSelect(entity))
        if (mouse.leftButtonUp || mouse.mouseOut)
            this.queries.interactorsSelecting.results
                .forEach(entity => this.tryEndSelect(entity))
    }

    tryStartSelect(interactor: Entity) {
        const interactable = interactor.getComponent(HoverEvent)!.interactable
        interactor.removeComponent(HoverEvent)
        interactor.addComponent(SelectEvent, { interactable })

        const mat = interactable.getComponent(StandardMaterialComp)!.value
        mat.diffuseColor = new Color3(0, 0, 1)
    }
    tryEndSelect(interactor: Entity) {
        const interactable = interactor.getComponent(SelectEvent)!.interactable
        interactor.removeComponent(SelectEvent)
        const mat = interactable.getComponent(StandardMaterialComp)!.value
        mat.diffuseColor = new Color3(1, 1, 1)
        //try hover again to avoid 1 render frame of no hover
    }

    static queries: SystemQueries = {
        interactorsHovering: {
            components: [TransformNodeComp, Interactor, HoverEvent]
        },
        interactorsSelecting: {
            components: [TransformNodeComp, Interactor, SelectEvent]
        },
        // selectables: {
        //     components: [Interactable, TransformNodeComp, StandardMaterialComp]
        // }
    }
}


// void InvokeInteraction(InteractionFunc interactorEvent, InteractionFunc interactableEvent)
// {
//     var info = new InteractionInfo(this, currentInteraction);
//     interactorEvent(info);
//     interactableEvent(info);
// }

// public void TryQuickSelect()
// {
//     TryStartSelect();
//     TryEndSelect();
// }

// public void TryStartSelect()
// {
//     if (!isHovering) return;
//     InvokeInteraction(EndHover, currentInteraction.EndHover);
//     isHovering = false;

//     InvokeInteraction(StartSelect, currentInteraction.StartSelect);
//     isSelecting = true;
// }

// public void TryEndSelect()
// {
//     if (!isSelecting) return;

//     InvokeInteraction(EndSelect, currentInteraction.EndSelect);
//     isSelecting = false;

//     currentInteraction = null;
//     onTryRestartHover.Invoke();
// }
