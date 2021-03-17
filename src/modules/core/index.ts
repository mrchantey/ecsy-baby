
import { DomEventSystem } from './systems/DomEventSystem';
import { InputSystem } from './systems/InputSystem';
import { RenderSystem } from './systems/RenderSystem';
import { DebugSystem } from './systems/DebugSystem';

import { CameraComp } from './components/Camera';
import { Canvas } from './components/Canvas';
import { CanvasEvents } from './components/CanvasEvents';
import { DebugLines } from './components/DebugLines';
import { EngineComp } from './components/Engine';
import { EulerRotation } from './components/EulerRotation';
import { Keyboard } from './components/Keyboard';
import { Mouse } from './components/Mouse';
import { Node } from './components/Node';
import { Render } from './components/Render';
import { SceneComp } from './components/Scene';
import { TransformNode } from './components/TransformNode';
import { WindowEvents } from './components/WindowEvents';

// import { ModuleConstructor, iModule, SystemPriority, SystemPriorityDelta } from "../../";
import { ModuleConstructor, iModule, SystemPriority } from "../../";
// import { SystemPriorityDelta } from '../../register';
import { ArcRotateCamera, Engine, EngineOptions, HemisphericLight, Scene, SceneOptions, TargetCamera, Vector3 } from 'babylonjs';
import { WorldOptions } from 'ecsy';
// import { Canvas, Engine as EngineComp, Node, Scene as SceneComp, Camera as CameraComp } from "./Components";

import * as bla from '../../register';

console.dir(bla.SystemPriorityDelta);



export {
    CameraComp,
    SceneComp,
    EngineComp,
    Canvas,
    CanvasEvents,
    DebugLines,
    EulerRotation,
    Keyboard,
    Mouse,
    Node,
    Render,
    TransformNode,
    WindowEvents
}

// console.dir(SystemPriority.BeforeInput);

enum CoreSystemPriority {
    DomEvents = 0,
    Input = 1,
    Render = 2,
    Debug = 3
    // DomEvents = SystemPriority.BeforeInput - SystemPriorityDelta,
    // Input = SystemPriority.BeforeInput + SystemPriorityDelta,
    // Render = SystemPriority.BeforeRender + SystemPriorityDelta,
    // Debug = SystemPriority.BeforeDebug + SystemPriorityDelta
}

export interface iCoreArgs {
    antialias?: boolean
    canvas?: HTMLCanvasElement
    engineOptions?: EngineOptions
    sceneOptions?: SceneOptions
    createCamera?: (scene: Scene, canvas: HTMLCanvasElement) => TargetCamera
    createLight?: boolean
}


function createDefaultCamera(scene: Scene, canvas: HTMLCanvasElement) {
    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    return camera
}


const components = [
    CameraComp,
    Canvas,
    CanvasEvents,
    DebugLines,
    EngineComp,
    EulerRotation,
    Keyboard,
    Mouse,
    Node,
    Render,
    SceneComp,
    TransformNode,
    WindowEvents
]

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
    antialias,
    canvas,
    engineOptions = {},
    sceneOptions = {},
    createCamera = createDefaultCamera,
    createLight = true,
}) => {
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
            const camera = createCamera(scene, canvas)

            world.entity
                .addComponent(EngineComp, { engine })
                .addComponent(Canvas, { canvas })
                .addComponent(SceneComp, { scene })
                .addComponent(CameraComp, { camera })
                .addComponent(WindowEvents)
                .addComponent(CanvasEvents)
                .addComponent(Mouse)
                .addComponent(Keyboard)
                .addComponent(DebugLines)

        },
        onSystemsRegistered: (world, scene) => {
            if (createLight) {
                const light = new HemisphericLight("light", new Vector3(0, 10, -5), scene)
            }
        }
    }
}
