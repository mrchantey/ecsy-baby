import { Component, ComponentSchema, Entity, Types } from 'ecsy';

export class Interactor extends Component<Interactor> {
    currentInteraction: Entity | undefined
    isHovering: boolean
    isSelecting: boolean

    static schema: ComponentSchema = {
        currentInteraction: {
            type: Types.Ref,
            default: null
        },
        isHovering: {
            type: Types.Boolean,
            default: false
        },
        isSelecting: {
            type: Types.Boolean,
            default: false
        }
    }
}