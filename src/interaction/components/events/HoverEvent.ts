import { Component, ComponentSchema, Entity, Types } from 'ecsy';

export class HoverEvent extends Component<HoverEvent> {
    interactable: Entity

    static schema: ComponentSchema = {
        interactable: { type: Types.Ref }
    }
}