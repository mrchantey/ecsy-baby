import { Component, ComponentSchema, Entity, Types } from 'ecsy';
import { ToolType } from 'interaction/utility';

export class EquipToolInstanceEvent extends Component<EquipToolInstanceEvent> {
    toolType: ToolType
    toolEntity: Entity
    static schema: ComponentSchema = {
        toolType: { type: Types.Number },
        toolEntity: { type: Types.Ref },
    }
}