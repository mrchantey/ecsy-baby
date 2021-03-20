import { Component, ComponentSchema, Entity, Types } from 'ecsy';

export class SelectEvent extends Component<SelectEvent> {
    interactable: Entity

    static schema: ComponentSchema = {
        interactable: { type: Types.Ref }
    }
}