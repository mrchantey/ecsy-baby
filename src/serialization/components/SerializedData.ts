import { Component, ComponentSchema, Types } from 'ecsy';

export class SerializedData extends Component<SerializedData> {
    value: string

    static schema: ComponentSchema = {
        value: { type: Types.String }
    }
}