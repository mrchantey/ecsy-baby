import { Color3, StandardMaterial } from "babylonjs"
import { Color3Ext, createTestScene, Mouse, StandardMaterialComp } from "core"
import { ExtraWorld } from "ecsyExtra"
import { SelectEvent, Interactable, InteractionEvent } from "interaction"
import { SelectSystem } from "interaction/systems"




describe("select system", () => {
    const scene = createTestScene()
    const world = new ExtraWorld()
        .registerComponent(Mouse)
        .registerComponent(SelectEvent)
        .registerComponent(Interactable)
        .registerComponent(InteractionEvent)
        .registerComponent(StandardMaterialComp)
        .registerSystem(SelectSystem)


    const colDefault = new Color3(1, 1, 1)
    const colSelect = new Color3(0, 0, 1)

    let mat = new StandardMaterial("my mat", scene)
    mat.diffuseColor = colDefault

    const interactable = world
        .createEntity("hoverable")
        .addComponent(Interactable)
        .addComponent(StandardMaterialComp, { value: mat })


    beforeAll(() => {

    })

    it("works", () => {
        expect(Color3Ext.isEqual(mat.diffuseColor, colDefault)).toBe(true)

        interactable.addComponent(InteractionEvent, { interactable })
        world.entity.setComponent(Mouse, { leftButtonDown: true })

        world.execute()
        expect(Color3Ext.isEqual(mat.diffuseColor, colSelect)).toBe(true)

        world.entity.setComponent(Mouse, { leftButtonDown: false, leftButtonUp: true })
        // interactable.removeComponent(InteractionEvent)
        world.execute()
        expect(Color3Ext.isEqual(mat.diffuseColor, colDefault)).toBe(true)
    })
})