import { iModule, ModuleConstructor, SystemPriority, SystemPriorityDelta } from "ecsyExtra";
import { EndInteractionSystem, HoverSystem, MouseFollowSystem, MoveItemSystem, RaycastInteractionSystem, SelectSystem, ToolEquipSystem } from "interaction/systems";

import * as Components from 'interaction/components';
import { CoreSystemPriority } from "core";

export const interactionModule: iModule = {
    components: Object.values(Components),
    systemGroups: [
        {
            priority: CoreSystemPriority.BeforeRender,
            systems: [
                //below order is important
                MouseFollowSystem,
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