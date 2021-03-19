
// import { BabyWorld, ModuleConstructor, SystemPriority, SystemPriorityDelta } from "../..";
// import { ModuleConstructor, iModule, SystemPriority, SystemPriorityDelta, } from "../../register";
import { ArcRotateCamera, Engine, EngineOptions, HemisphericLight, Scene, SceneOptions, TargetCamera, Vector3 } from 'babylonjs';
import { ModuleConstructor, SystemPriority, SystemPriorityDelta } from '../../register';
import { BabyWorld } from '../..';
import { babylonComponents, Canvas, CanvasEvents, DebugLines, EngineComp, EulerRotation, Keyboard, Mouse, SceneComp, TargetCameraComp, WindowEvents } from "./components";
import { DebugSystem, DomEventSystem, InputSystem, RenderSystem } from "./systems";


// console.dir(SystemPriority);

export enum CoreSystemPriority {
    DomEvents = SystemPriority.BeforeInput - SystemPriorityDelta,
    Input = SystemPriority.BeforeInput + SystemPriorityDelta,
    Render = SystemPriority.BeforeRender + SystemPriorityDelta,
    Debug = SystemPriority.BeforeDebug + SystemPriorityDelta
}

export interface iCoreArgs {
    antialias?: boolean
    canvas?: HTMLCanvasElement
    engineOptions?: EngineOptions
    sceneOptions?: SceneOptions
    createCamera?: iCreateCamera
    createLight?: boolean
}

export interface iCreateCamera {
    (scene: Scene, canvas: HTMLCanvasElement, world: BabyWorld): TargetCamera
}



const createDefaultCamera: iCreateCamera = (scene: Scene, canvas: HTMLCanvasElement, world: BabyWorld) => {
    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    return camera
}



const components = babylonComponents.concat([
    Canvas,
    CanvasEvents,
    DebugLines,
    EulerRotation,
    Keyboard,
    Mouse,
    WindowEvents
])

const systems = [
    {
        priority: CoreSystemPriority.DomEvents,
        systems: [DomEventSystem]
    },
    {
        priority: CoreSystemPriority.Input,
        systems: [InputSystem]
    },
    {
        priority: CoreSystemPriority.Render,
        systems: [RenderSystem]
    },
    {
        priority: CoreSystemPriority.Debug,
        systems: [DebugSystem]
    },
]


export const createCoreModule: ModuleConstructor<iCoreArgs> = ({
    antialias = true,
    canvas,
    engineOptions = {},
    sceneOptions = {},
    createCamera = createDefaultCamera,
    createLight = true,
} = {}) => {
    return {
        components,
        systems,
        onComponentsRegistered: world => {

            if (!canvas) {
                canvas = document.getElementsByTagName('canvas')[0]
                if (!canvas) {
                    canvas = document.createElement('canvas')
                    document.body.appendChild(canvas)
                }
            }
            const engine = new Engine(canvas, antialias, engineOptions)
            const scene = new Scene(engine, sceneOptions)
            const camera = createCamera(scene, canvas, world)

            world.entity
                .addComponent(EngineComp, { value: engine })
                .addComponent(Canvas, { value: canvas })
                .addComponent(SceneComp, { value: scene })
                .addComponent(TargetCameraComp, { value: camera })
                .addComponent(WindowEvents)
                .addComponent(CanvasEvents)
                .addComponent(Mouse)
                .addComponent(Keyboard)
                .addComponent(DebugLines)

        },
        onSystemsRegistered: (world) => {
            const scene = world.entity.getComponent(SceneComp)!.value
            if (createLight) {
                const light = new HemisphericLight("light", new Vector3(0, 10, -5), scene)
            }
        }
    }
}
