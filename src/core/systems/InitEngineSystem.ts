import { Engine, EngineOptions, Logger, NullEngine } from "babylonjs";
import { Canvas, EngineComp, InitEngine } from "core/components";
import { SystemQueries } from "ecsy";
import { ExtraSystem } from "extra-ecsy";

export class InitEngineSystem extends ExtraSystem {
    execute() {

        this.queries.entities.results
            .forEach(entity => {
                const canvas = entity.getComponent(Canvas)!.value
                const initEngine = entity.getComponent(InitEngine)!
                Logger.LogLevels = Logger.ErrorLogLevel
                const engine = createDefaultBabylonEngine(canvas, initEngine.antialias, initEngine.engineOptions)
                entity.addComponent(EngineComp, { value: engine })
                entity.removeComponent(InitEngine)
            })
    }

    static queries: SystemQueries = {
        entities: {
            components: [Canvas, InitEngine]
        }
    }
}


const createDefaultBabylonEngine = (canvas: HTMLCanvasElement, antialias?: boolean, engineOptions?: EngineOptions) => {
    if (process.env.NODE_ENV === 'test')
        return new NullEngine()
    return new Engine(canvas, antialias, engineOptions)
}
