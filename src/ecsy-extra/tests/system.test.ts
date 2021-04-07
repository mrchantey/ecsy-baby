import { ExtraWorld } from ".."
import { TestValueComponent, TestSystem } from "./testTypes"

describe("system", () => {
    let world: ExtraWorld
    // world
    // .registerComponent(TestValueComponent)

    beforeAll(async () => {
        world = new ExtraWorld()
    })
    it("doesnt have test value component", () =>
        expect(world.hasRegisteredComponent(TestValueComponent)).toBe(false)
    )

    it("has no systems", () =>
        expect(world.getSystems()).toHaveLength(0))

    it("registers a system", () => {
        world
            .registerComponent(TestValueComponent)
            .registerSystem(TestSystem)
        expect(world.getSystems()).toHaveLength(1)
    })

    it("runs the start function", async (done) => {
        world.getSystem(TestSystem)._onStart = done
        world.start()
    })

    it("runs the execute function", done => {
        world
            .createEntity("test entity")
            .addComponent(TestValueComponent)
        world.getSystem(TestSystem)._onExecute = done
        world.execute()
    })

    it("runs the dispose function", done => {
        world.getSystem(TestSystem)._onDispose = done
        world.dispose()
    })
})