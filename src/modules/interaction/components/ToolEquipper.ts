import { Component, ComponentSchema, Types } from 'ecsy';
import { Tool } from '../utility/tools';

export class ToolEquipper extends Component<ToolEquipper> {
    currentTool: Tool

    static schema: ComponentSchema = {
        currentTool: { type: Types.Number }
    }
}