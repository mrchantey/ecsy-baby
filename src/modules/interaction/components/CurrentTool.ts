import { Component, ComponentSchema, Types } from 'ecsy';

export class CurrentTool extends Component<CurrentTool> {
    tool: number

    static schema: ComponentSchema = {
        tool: { type: Types.Number }
    }
}