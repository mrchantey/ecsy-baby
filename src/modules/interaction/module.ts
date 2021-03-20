import { iSystemsToRegister, ModuleConstructor, SystemPriority } from "../../register";
import { HoverSystem, MoveItemSystem, SelectSystem, ToolEquipSystem, ViewSystem } from "./systems";

import * as Components from './components';


export interface iArgs {

}

const systems: iSystemsToRegister[] = [
    {
        priority: SystemPriority.BeforeRender,
        systems: [
            //below order is important
            HoverSystem,
            SelectSystem,
            ToolEquipSystem,
            //below order is not important
            ViewSystem,
            MoveItemSystem
        ]
    }
]

export const createInteractionModule: ModuleConstructor<iArgs> = () => {

    return {
        components: Object.values(Components),
        systems
    }
}