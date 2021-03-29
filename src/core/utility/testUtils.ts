import { Logger, NullEngine, Scene } from "babylonjs"

export function createSceneComp() {
    Logger.LogLevels = Logger.ErrorLogLevel
    const engine = new NullEngine()
    const scene = new Scene(engine)
    return { value: scene }
}

