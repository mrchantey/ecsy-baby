import { ExtraWorld } from ".."
import { TestValueComponent, TestSystem } from "./testTypes"

describe.only("system", () => {
    let world: any
    // world
    // .registerComponent(TestValueComponent)

    beforeAll(async () => {
        world = new ExtraWorld()
    })
    it("doesnt have test value component", () =>
        expect(world.hasRegisteredComponent(TestValueComponent)).toBe(false)
    )

    it("starts with no systems", () =>
        expect(world.getSystems()).toHaveLength(0))

    it("registers a system", () => {
        world
            .registerComponent(TestValueComponent)
            .registerSystem(TestSystem)
        expect(world.getSystems()).toHaveLength(1)
    })

    it("runs with system", async (done) => {
        const entity = world
            .createEntity("test entity")
            .addComponent(TestValueComponent)
        world.start()
        world.getSystem(TestSystem)._onExecute = () => {
            done()
        }
        world.execute()
    })
})