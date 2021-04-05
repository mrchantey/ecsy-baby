import { NullEngine, Scene, TargetCamera, Vector3 } from "babylonjs"
import { ExtraWorld, KeyValue } from "../../extra-ecsy/index"
import { SceneComp } from "../components/BabylonComponents"
import { DebugPanel } from "../components/DebugPanel"
import { Keyboard } from "../components/Keyboard"
import { ShortcutSystem } from "../systems/ShortcutSystem"
import { createTestScene } from "../utility/testUtils"





describe("shortcutSystem", () => {

    const world = new ExtraWorld()
        .registerComponent(SceneComp)
        .registerComponent(Keyboard)
        .registerComponent(DebugPanel)
        .registerSystem(ShortcutSystem)
    world.start()
    world.entity
        .addComponent(SceneComp, { value: createTestScene() })
        .addComponent(Keyboard)
        .addComponent(DebugPanel)

    it("runs", () => {
        expect(world.getSystem(ShortcutSystem))
            .toBeTruthy()
        expect(() => world.execute())
            .not
            .toThrow()
    })
    it("toggles the debugger", () => {
        const kb = world.entity.getMutableComponent(Keyboard)!
        kb.keysPressed[KeyValue.Control] = true
        kb.keysDown[KeyValue.KEY_B] = true
        world.execute()
        const panel = world.entity.getComponent(DebugPanel)!
        expect(panel.isVisible).toBeTruthy()
        world.execute()
        expect(panel.isVisible).toBeFalsy()
    })
})
