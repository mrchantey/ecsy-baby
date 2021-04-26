
import * as Components from './components';
import { DebugSystem, DomEventSystem, InitCameraSystem, InitLightSystem, InitPlayerSystem, InitSceneSystem, InputSystem, KeyboardMoveSystem, MouseLookSystem, RenderSystem } from "./systems";
// import { RenderSystem } from './systems/RenderSystem';
import { ShortcutSystem } from './systems/ShortcutSystem';
import { InitEngineSystem } from './systems/InitEngineSystem';
import { iModule, SystemPriority, SystemPriorityDelta } from '../ecsyExtra/index';
import { InitCanvasSystem } from 'core/systems/InitCanvasSystem';
// import { DebugSystem } from './systems/DebugSystem';

export enum CoreSystemPriority {
    Input = SystemPriority.Early,
    BeforeRender = SystemPriority.Middle - SystemPriorityDelta,
    Render = SystemPriority.Middle,
    AfterRender = SystemPriority.Middle + SystemPriorityDelta,
    Debug = SystemPriority.Late
}

export const coreModule: iModule = {
    components: Object.values(Components),
    systemGroups: [
        {
            priority: SystemPriority.First,
            systems: [
                InitCanvasSystem,
                InitEngineSystem,
                InitSceneSystem,
                InitLightSystem,
                InitCameraSystem,
                InitPlayerSystem,
            ]
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
        {
            priority: SystemPriority.Last,
            systems: [
                //dom events will set components in between execute calls.
                //the execute for this system is cleanup
                DomEventSystem,
            ]
        }
    ]
}
