import { Component, ComponentSchema, Types } from 'ecsy';

export class MoveItemsTool extends Component<MoveItemsTool> {
    // value: boolean

    static schema: ComponentSchema = {
        value: { type: Types.Boolean }
    }
}