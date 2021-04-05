// import 'babylonjs';
import { ExtraWorld, registerModules } from "../../extra-ecsy"
import { coreModule } from "../module"





describe("core modules", () => {

    beforeAll(() => {

    })

    it("works", () => {
        const world = new ExtraWorld()
        registerModules(world, [coreModule])
        world.start()
        world.execute()

        const val = false
        expect(val).toBeTruthy()
    })
})