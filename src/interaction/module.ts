import { iModule, ModuleConstructor, SystemPriority, SystemPriorityDelta } from "../ecsy-extra/index";
import { EndInteractionSystem, HoverSystem, MoveItemSystem, RaycastInteractionSystem, SelectSystem, ToolEquipSystem } from "./systems";

import * as Components from './components';
import { CoreSystemPriority } from "core";

export const interactionModule: iModule = {
    components: Object.values(Components),
    systemGroups: [
        {
            priority: CoreSystemPriority.BeforeRender,
            systems: [
                //below order is important
                RaycastInteractionSystem,
                SelectSystem,
                HoverSystem,
                EndInteractionSystem,
                ToolEquipSystem,
                //below order is not important, either/or kinda thing
                MoveItemSystem
            ]
        }
    ]
}