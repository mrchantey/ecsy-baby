import { Component, ComponentSchema, Types } from 'ecsy';
import { Tool } from '../utility/tools';

export class CurrentTool extends Component<CurrentTool> {
    tool: Tool

    static schema: ComponentSchema = {
        tool: { type: Types.Number }
    }
}