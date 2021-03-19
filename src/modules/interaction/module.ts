import { iSystemsToRegister, ModuleConstructor, SystemPriority } from "../../register";
import { CurrentTool, Interactable, Interactor, MoveItemsTool, RotateItemsTool, ToolEquipper, ViewTool } from "./components";
import { HoverSystem, MoveItemsSystem, SelectSystem, ToolEquipSystem, ViewSystem } from "./systems";


import * as Components from './components';

const components = Object.values(Components)


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
            MoveItemsSystem
        ]
    }
]

export const createInteractionModule: ModuleConstructor<iArgs> = () => {

    return {
        components,
        systems
    }
}