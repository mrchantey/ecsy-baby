import { Engine, EngineOptions, Logger, NullEngine } from "babylonjs";
import { Canvas, EngineComp, InitEngine } from "core/components";
import { SystemQueries } from "ecsy";
import { ExtraSystem } from "ecsyExtra";

export class InitEngineSystem extends ExtraSystem {


    start() {
        const canvas = this.getSingletonComponent(Canvas)!.value
        const initEngine = this.getSingletonComponent(InitEngine)
        Logger.LogLevels = Logger.ErrorLogLevel

        const engine = createDefaultBabylonEngine(canvas, initEngine?.antialias, initEngine?.engineOptions)
        this.addSingletonComponent(EngineComp, { value: engine })
        this.removeSingletonComponent(InitEngine)
    }
}


const createDefaultBabylonEngine = (canvas: HTMLCanvasElement, antialias?: boolean, engineOptions?: EngineOptions) => {
    if (process.env.NODE_ENV === 'test')
        return new NullEngine()
    return new Engine(canvas, antialias, engineOptions)
}
