import { iSystemsToRegister, ModuleConstructor, SystemPriority } from "../../register";
import { CurrentTool } from "./components/CurrentTool";
import { Interactable } from "./components/Interactable";
import { Interactor } from "./components/Interactor";
import { MoveItemsTool } from "./components/MoveItemsTool";
import { RotateItemsTool } from "./components/RotateItemsTool";
import { ToolEquipper } from "./components/ToolEquipper";
import { ViewTool } from "./components/ViewTool";
import { InteractionSystem } from "./systems/InteractionSystem";
import { ToolEquipSystem } from "./systems/ToolEquipSystem";
import { ViewSystem } from "./systems/ViewSystem";



export interface iArgs {

}

const components = [
    CurrentTool,
    Interactable,
    Interactor,
    MoveItemsTool,
    RotateItemsTool,
    ToolEquipper,
    ViewTool
]

const systems: iSystemsToRegister[] = [
    {
        priority: SystemPriority.BeforeRender,
        systems: [
            InteractionSystem,
            ToolEquipSystem,
            ViewSystem
        ]
    }
]

export const createInteractionModule: ModuleConstructor<iArgs> = () => {

    return {
        components,
        systems
    }
}