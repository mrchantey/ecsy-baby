import { Component } from "ecsy";
import { MoveItemsTool } from "../components/MoveItemsTool";
import { NoTool } from "../components/NoTool";
import { RotateItemsTool } from "../components/RotateItemsTool";
import { ViewTool } from "../components/ViewTool";

export enum Tool {
    None,
    View,
    MoveItems,
    RotateItems
}


// interface iToolLookup {
//     0:MoveItemsTool
//     [key: number]: Component<any>
// }

export const toolComponentLookup = [
    NoTool,
    ViewTool,
    MoveItemsTool,
    RotateItemsTool
]