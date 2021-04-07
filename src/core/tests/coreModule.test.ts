import { WindowEvents, Canvas, CanvasEvents, DomEventSystem, coreModule } from "core"
import { ExtraWorld, registerModules } from "ecsy-extra"


describe("core module", () => {

    beforeAll(() => {

    })

    it("registers the old fashion way", () => {
        const world = new ExtraWorld()
            .registerComponent(WindowEvents)
            .registerComponent(Canvas)
            .registerComponent(CanvasEvents)
            .registerSystem(DomEventSystem)

        // registerModules(world, [coreModule])
    })

    it("registers using the core module", () => {
        const world = new ExtraWorld()
        registerModules(world, [coreModule])
        world.entity
            .addComponent(Canvas, { value: document.createElement('canvas') })
        // .addComponent(WindowEvents)
        world.start()
        world.execute()
        world.dispose()
    })
})