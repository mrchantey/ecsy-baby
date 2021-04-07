



import { Component, ComponentSchema, Types } from 'ecsy';
import { ExtraEntity } from 'ecsy-extra';

export class InteractionEvent extends Component<InteractionEvent> {
    interactable: ExtraEntity

    static schema: ComponentSchema = {
        interactable: { type: Types.Ref }
    }
}
