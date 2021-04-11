import { Component, ComponentConstructor } from "ecsy";
import { MoveItemTool, NoTool } from "interaction/components";

export enum ToolType {
    None,
    View,
    MoveItems,
    RotateItems
}

export interface iToolType {
    toolType: ToolType
}
