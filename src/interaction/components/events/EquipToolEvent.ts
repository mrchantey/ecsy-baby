import { Component, ComponentSchema, Entity, Types } from 'ecsy';
import { iToolType, ToolType } from '../../utility';

interface iToolComponent extends Component<any> {
    toolType: ToolType
}


export class EquipToolEvent extends Component<EquipToolEvent> {
    toolType: ToolType
    // tool: iToolComponent
    toolEntity: Entity
    static schema: ComponentSchema = {
        toolType: { type: Types.Number },
        toolEntity: { type: Types.Ref },
    }
}