import { Component, ComponentSchema, Types } from 'ecsy';

export class KeyboardMove extends Component<KeyboardMove> {
    translateSpeed: number
    rotateSpeed: number

    static schema: ComponentSchema = {
        translateSpeed: { type: Types.Number, default: 5 },
        rotateSpeed: { type: Types.Number, default: 3 }
    }
}