import { Component, ComponentSchema, Entity, Types } from 'ecsy';
import { ToolType } from '../utility';
// import { Tool } from '../utility/tools';

export class ToolEquipper extends Component<ToolEquipper> {
    currentTool: ToolType

    static schema: ComponentSchema = {
        currentTool: { type: Types.Number }
    }
}