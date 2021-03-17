import { Component } from "ecsy";
import { MoveItemsTool } from "../components/MoveItemsTool";
import { RotateItemsTool } from "../components/RotateItemsTool";
import { ViewTool } from "../components/ViewTool";

export enum Tool {
    View,
    MoveItems,
    RotateItems
}


// interface iToolLookup {
//     0:MoveItemsTool
//     [key: number]: Component<any>
// }

export const toolComponentLookup = [
    ViewTool,
    MoveItemsTool,
    RotateItemsTool
]