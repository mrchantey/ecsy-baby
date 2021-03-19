import { Color3, TransformNode } from "babylonjs";
import { SystemQueries } from "ecsy";
import { BabySystem } from "../../../"
import { Mouse, StandardMaterialComp, TransformNodeComp } from "../../core";
import { Interactable, Interactor } from "../components";

export class SelectSystem extends BabySystem {
    execute() {
        const mouse = this.getSingletonComponent(Mouse)
        this.queries.interactors.results
            .forEach((entity, index) => {
                const interactor = entity.getMutableComponent(Interactor)!
                if (mouse.leftButtonDown)
                    this.tryStartSelect(interactor)
                if (mouse.leftButtonUp || mouse.mouseOut)
                    // if (mouse.leftButtonUp)
                    this.tryEndSelect(interactor)
            })
    }

    tryStartSelect(interactor: Interactor) {
        if (!interactor.isHovering)
            return
        interactor.isHovering = false
        //interaction event
        interactor.isSelecting = true
        const interactable = interactor.currentInteraction
        if (interactable === undefined)
            console.warn(`SelectSystem - tried to Start Select but no current interaction`)
        else {
            const mat = interactable.getComponent(StandardMaterialComp)!.value
            mat.diffuseColor = new Color3(0, 0, 1)
        }
    }
    tryEndSelect(interactor: Interactor) {
        if (!interactor.isSelecting)
            return
        interactor.isSelecting = false
        //interaction event
        const interactable = interactor.currentInteraction
        if (interactable === undefined)
            console.warn(`SelectSystem - tried to End Select but no current interaction`)
        else {
            const mat = interactable.getComponent(StandardMaterialComp)!.value
            mat.diffuseColor = new Color3(1, 1, 1)
            interactor.currentInteraction = undefined
        }
        //try hover again to avoid flicker
    }


    static queries: SystemQueries = {
        interactors: {
            components: [TransformNodeComp, Interactor]
        },
        interactables: {
            components: [Interactable, TransformNodeComp, StandardMaterialComp]
        }
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
