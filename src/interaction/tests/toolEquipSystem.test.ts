import { ExtraWorld } from "ecsy-extra"
import { EquipToolEvent, ToolEquipper } from "interaction/components"
import { ToolEquipSystem } from "interaction/systems"




describe("tool equip system", () => {
    let world: ExtraWorld
    beforeAll(() => {
        world = new ExtraWorld()
            .registerComponent(ToolEquipper)
            .registerComponent(EquipToolEvent)
            .registerSystem(ToolEquipSystem)
        world.start()
    })

    it("registers the system", () => {
        expect(world.getSystem(ToolEquipSystem))
            .toBeInstanceOf(ToolEquipSystem)
    })

    it("creates a tool equipper", () => {
        world.createEntity("tool equipper")
            .addComponent(ToolEquipper)
        //     .addComponent(EquipToolEvent,{toolType:})

        // world.createEntity("tool",)

    })


})