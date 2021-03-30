import { Logger, NullEngine, Scene } from "babylonjs"

export function createTestScene() {
    Logger.LogLevels = Logger.ErrorLogLevel
    const engine = new NullEngine()
    return new Scene(engine)
}

