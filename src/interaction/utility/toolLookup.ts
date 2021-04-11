import { Component, ComponentConstructor } from "ecsy";
import { MoveItemTool, NoTool } from "interaction/components";
import { ToolType } from "interaction/utility/tools";


//keep this seperate from utility/tools cos these components depend on that
//and this depends on the components and thats like a circle or something
export const toolLookup = {
    [ToolType.None]: NoTool,
    [ToolType.MoveItems]: MoveItemTool
} as iComponentLookup


interface iComponentLookup {
    [key: number]: ComponentConstructor<Component<any>>
}
