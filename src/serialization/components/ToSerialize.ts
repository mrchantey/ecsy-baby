import { Component, ComponentSchema, Types } from 'ecsy';

export class ToSerialize extends Component<ToSerialize> {
    explicitInclude: boolean

    static schema: ComponentSchema = {
        explicitInclude: { type: Types.Boolean, default: false }
    }
}