import { Canvas, CanvasEvents, DomEventSystem } from ".."
import { ExtraWorld, registerModules } from "../../extra-ecsy"
import { TestSystem } from "../../extra-ecsy/tests/testTypes"
import { WindowEvents } from "../components"
// import { WindowEvents } from "../components/WindowEvents"
import { coreModule } from "../module"
// import { DomEventSystem } from "../systems"






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

    })
})