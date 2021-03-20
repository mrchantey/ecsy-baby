
// import { BabyWorld, ModuleConstructor, SystemPriority, SystemPriorityDelta } from "../..";
// import { ModuleConstructor, iModule, SystemPriority, SystemPriorityDelta, } from "../../register";
import { ArcRotateCamera, Engine, EngineOptions, HemisphericLight, Scene, SceneOptions, TargetCamera, TransformNode, Vector3 } from 'babylonjs';
import { ModuleConstructor, SystemPriority, SystemPriorityDelta } from '../../register';
import { BabyWorld } from '../..';
import { Canvas, CanvasEvents, DebugLines, EngineComp, EulerRotation, Keyboard, KeyboardMove, Mouse, MouseLook, Player, SceneComp, TargetCameraComp, TransformNodeComp, WindowEvents } from "./components";
import * as Components from './components';
import { DebugSystem, DomEventSystem, InputSystem, KeyboardMoveSystem, MouseLookSystem, RenderSystem } from "./systems";
import { ShortcutSystem } from './systems/ShortcutSystem';


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
    createPlayer?: boolean
}

export interface iCreateCamera {
    (scene: Scene, canvas: HTMLCanvasElement, world: BabyWorld): TargetCamera
}



// const createDefaultCamera: iCreateCamera = (scene: Scene, canvas: HTMLCanvasElement, world: BabyWorld) => {
//     const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, new Vector3(0, 0, 0), scene);
//     camera.attachControl(canvas, true);
//     return camera
// }

const createDefaultCamera: iCreateCamera = (scene, canvas, world) => {
    const camera = new TargetCamera("camera", new Vector3(0, 0, -5), scene)
    return camera
}


const systems = [
    {
        priority: CoreSystemPriority.DomEvents,
        systems: [DomEventSystem]
    },
    {
        priority: CoreSystemPriority.Input,
        systems: [
            InputSystem,
            ShortcutSystem,
            KeyboardMoveSystem,
            MouseLookSystem,
        ]
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
    createPlayer = true,
} = {}) => {
    return {
        components: Object.values(Components),
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

            scene.onDispose = () => world.dispose()



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

            if (createPlayer) {

                const node = new TransformNode("player", scene)
                node.position = camera.position
                camera.parent = node
                camera.position = Vector3.Zero()

                const entity = world.createEntity("player")
                    .addComponent(TargetCameraComp, { value: camera })
                    .addComponent(TransformNodeComp, { value: node })
                    .addComponent(MouseLook)
                    .addComponent(KeyboardMove)

                world.entity.addComponent(Player, { value: entity })
            }
        },
        onSystemsRegistered: (world) => {
            const scene = world.entity.getComponent(SceneComp)!.value
            if (createLight) {
                const light = new HemisphericLight("light", new Vector3(0, 10, -5), scene)
            }


        }
    }
}
