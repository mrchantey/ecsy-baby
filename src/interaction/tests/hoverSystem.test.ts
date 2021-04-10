import { Color3, StandardMaterial } from "babylonjs"
import { Color3Ext, createTestScene, StandardMaterialComp, TransformNodeComp } from "core"
import { ExtraEntity, ExtraWorld } from "ecsy-extra"
import { HoverEvent, Interactable, Interactor, SelectEvent } from "interaction/components"
import { InteractionEvent } from "interaction/components/events/InteractionEvent"
import { HoverSystem } from "interaction/systems"

describe("hover system", () => {
    const scene = createTestScene()
    const world = new ExtraWorld()
        .registerComponent(SelectEvent)
        .registerComponent(Interactable)
        .registerComponent(InteractionEvent)
        .registerComponent(StandardMaterialComp)
        .registerSystem(HoverSystem)


    const colDefault = new Color3(1, 1, 1)
    const colHover = new Color3(0, 1, 1)

    let mat = new StandardMaterial("my mat", scene)
    mat.diffuseColor = colDefault

    const interactable = world
        .createEntity("hoverable")
        .addComponent(Interactable)
        .addComponent(StandardMaterialComp, { value: mat })


    it("works", () => {
        expect(Color3Ext.isEqual(mat.diffuseColor, colDefault)).toBe(true)

        interactable.addComponent(InteractionEvent)
        world.execute()
        expect(Color3Ext.isEqual(mat.diffuseColor, colHover)).toBe(true)

        interactable.removeComponent(InteractionEvent)
        world.execute()
        expect(Color3Ext.isEqual(mat.diffuseColor, colDefault)).toBe(true)
    })
})