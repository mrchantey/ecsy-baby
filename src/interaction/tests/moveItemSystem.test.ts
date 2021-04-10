import { createTestScene, TransformNodeComp } from "core"
import { ExtraWorld } from "ecsy-extra"
import { Interactable, Interactor, SelectEvent } from "interaction/components"



describe("move item system", () => {
    const scene = createTestScene()
    const world = new ExtraWorld()
        .registerComponent(TransformNodeComp)
        .registerComponent(Interactor)
        .registerComponent(Interactable)
        .registerComponent(SelectEvent)


    beforeAll(() => {

    })

    it("works", () => {
        const val = false
        expect(val).toBeTruthy()
    })
})