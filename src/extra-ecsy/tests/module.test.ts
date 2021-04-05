import { registerModules } from "../register"
import { ExtraWorld } from "../types"
import { testModule, TestValueComponent } from "./testTypes"





describe("module", () => {

    beforeAll(async () => {

    })

    it("registers the module", async () => {
        const world = new ExtraWorld()
        registerModules(world, [testModule])
        expect(world.hasRegisteredComponent(TestValueComponent))
            .toBe(true)
        expect(world.getSystems()).toHaveLength(1)
        // const val = false
        // expect(val).toBeTruthy()
    })
})