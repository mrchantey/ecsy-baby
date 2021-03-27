import { Component, ComponentSchema, Types } from 'ecsy';

export class DebugPanel extends Component<DebugPanel> {
    isVisible: boolean

    static schema: ComponentSchema = {
        isVisible: { type: Types.Boolean }
    }
}