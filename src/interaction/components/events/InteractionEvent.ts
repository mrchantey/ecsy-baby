



import { Component, ComponentSchema, Types } from 'ecsy';
import { ExtraEntity } from 'ecsy-extra';

export class InteractionEvent extends Component<InteractionEvent> {
    interactor: ExtraEntity
    interactable: ExtraEntity

    static schema: ComponentSchema = {
        interactor: { type: Types.Ref },
        interactable: { type: Types.Ref }
    }
}
