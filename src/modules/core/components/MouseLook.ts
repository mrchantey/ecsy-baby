import { Component, ComponentSchema, Types } from 'ecsy';

export class MouseLook extends Component<MouseLook> {
    requireHoldAlt: boolean
    speed: number

    static schema: ComponentSchema = {
        requireHoldAlt: { type: Types.Boolean, },
        speed: { type: Types.Number, default: 100 }
    }
}