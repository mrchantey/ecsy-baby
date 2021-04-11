import { Tools } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';
import { ToolType } from 'interaction/utility/tools';

export class NoTool extends Component<NoTool> {
    toolType: ToolType
    static schema: ComponentSchema = {
        toolType: { type: Types.Number, default: ToolType.None }
    }
}