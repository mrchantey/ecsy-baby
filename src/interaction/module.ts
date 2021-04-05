import { iModule, ModuleConstructor, SystemPriority, SystemPriorityDelta } from "../extra-ecsy/index";
import { HoverSystem, MoveItemSystem, SelectSystem, ToolEquipSystem } from "./systems";

import * as Components from './components';

export const interactionModule: iModule = {
    components: Object.values(Components),
    systemGroups: [
        {
            priority: SystemPriority.Early + SystemPriorityDelta,
            systems: [
                //below order is important
                HoverSystem,
                SelectSystem,
                ToolEquipSystem,
                //below order is not important, either/or kinda thing
                MoveItemSystem
            ]
        }
    ]
}