import { Vector3 } from "babylonjs"
import { AdvancedPlane } from "core"
import { World } from "ecsy"
import { ExtraWorld } from "ecsy-extra"
import { ToolType } from "interaction"
import { EquipToolEvent, EquipToolInstanceEvent, MoveItemTool, NoTool, ToolEquipper } from "interaction/components"
import { ToolEquipSystem } from "interaction/systems"
import { toolLookup } from "interaction/utility/toolLookup"

describe("tool lookup", () => {

    beforeAll(() => {

    })

    it("works", () => {

        expect(toolLookup[ToolType.MoveItems]).toBeTruthy()
    })
})


describe("tool equip system", () => {
    const world = new World()
        .registerComponent(ToolEquipper)
        .registerComponent(EquipToolEvent)
        .registerComponent(EquipToolInstanceEvent)
        .registerComponent(MoveItemTool)
        .registerComponent(NoTool)
        .registerSystem(ToolEquipSystem)

    const plane = new AdvancedPlane(Vector3.Zero(), Vector3.Forward())


    const equipper = world.createEntity("tool equipper")
        .addComponent(ToolEquipper)
    beforeAll(() => {
    })

    it("registers the system", () => {
        expect(world.getSystem(ToolEquipSystem))
            .toBeInstanceOf(ToolEquipSystem)
    })


    it("creates a tool from abstract", () => {
        equipper.addComponent(EquipToolEvent, { toolType: ToolType.MoveItems, toolParams: { plane } })
        world.execute()
        expect(equipper.hasComponent(EquipToolEvent)).toBeFalsy()
        expect(equipper.hasComponent(MoveItemTool)).toBeTruthy()
        expect(equipper.getComponent(MoveItemTool)!.plane).toBe(plane)
    })

    it("creates a tool from instance", () => {
        const toolEntity = world
            .createEntity("tool")
            .addComponent(MoveItemTool, { plane })
        equipper.addComponent(EquipToolInstanceEvent, { toolType: ToolType.MoveItems, toolEntity })
        world.execute()
        expect(equipper.hasComponent(EquipToolEvent)).toBeFalsy()
        expect(equipper.hasComponent(MoveItemTool)).toBeTruthy()
        expect(equipper.getComponent(MoveItemTool)!.plane).toBe(plane)
    })


})