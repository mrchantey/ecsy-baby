import { Component, ComponentSchema, Entity, Types } from 'ecsy';
import { ToolType } from 'interaction/utility';


export class EquipToolEvent extends Component<EquipToolEvent> {
    toolType: ToolType
    toolParams: Object
    static schema: ComponentSchema = {
        toolType: { type: Types.Number },
        toolParams: { type: Types.Ref },
    }
}