
import * as Components from './components';
import { DebugSystem, DomEventSystem, InitCameraSystem, InitLightSystem, InitPlayerSystem, InitSceneSystem, InputSystem, KeyboardMoveSystem, MouseLookSystem, RenderSystem } from "./systems";
// import { RenderSystem } from './systems/RenderSystem';
import { ShortcutSystem } from './systems/ShortcutSystem';
import { InitEngineSystem } from './systems/InitEngineSystem';
import { iModule, SystemPriority } from '../extra-ecsy/index';
// import { DebugSystem } from './systems/DebugSystem';

export enum CoreSystemPriority {
    DomEvents = SystemPriority.First,
    Input = SystemPriority.Early,
    Render = SystemPriority.Middle,
    Debug = SystemPriority.Late
}

export const coreModule: iModule = {
    components: Object.values(Components),
    systemGroups: [
        {
            priority: SystemPriority.First,
            systems: [
                InitEngineSystem,
                InitSceneSystem,
                InitLightSystem,
                InitCameraSystem,
                InitPlayerSystem,
            ]
        },
        // {
        //     priority: CoreSystemPriority.DomEvents,
        //     systems: [DomEventSystem]
        // },
        // {
        //     priority: CoreSystemPriority.Input,
        //     systems: [
        //         InputSystem,
        //         ShortcutSystem,
        //         KeyboardMoveSystem,
        //         MouseLookSystem,
        //     ]
        // },
        {
            priority: CoreSystemPriority.Render,
            systems: [RenderSystem]
        },
        // {
        //     priority: CoreSystemPriority.Debug,
        //     systems: [DebugSystem]
        // },
    ]
}
