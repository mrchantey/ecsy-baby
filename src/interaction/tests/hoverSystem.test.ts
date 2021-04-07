import { StandardMaterialComp, TransformNodeComp } from "core"
import { ExtraWorld } from "ecsy-extra"
import { HoverEvent, Interactable, Interactor, SelectEvent } from "interaction/components"
import { InteractionEvent } from "interaction/components/events/InteractionEvent"
import { HoverSystem } from "interaction/systems"

describe("hover system", () => {
    let world: ExtraWorld
    beforeAll(() => {
        world = new ExtraWorld()
            // .registerComponent(TransformNodeComp)
            .registerComponent(Interactor)
            .registerComponent(InteractionEvent)
            // .registerComponent(HoverEvent)
            // .registerComponent(SelectEvent)
            // .registerComponent(Interactable)
            // .registerComponent(StandardMaterialComp)
            .registerSystem(HoverSystem)
    })

    it("works", () => {
        world


        const val = false
        expect(val).toBeTruthy()
    })
})