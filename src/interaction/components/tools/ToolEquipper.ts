import { Component, ComponentSchema, Entity, Types } from 'ecsy';
import { ToolType } from 'interaction/utility/tools';

export class ToolEquipper extends Component<ToolEquipper> {
    currentTool: ToolType

    static schema: ComponentSchema = {
        currentTool: { type: Types.Number, default: ToolType.None }
    }
}