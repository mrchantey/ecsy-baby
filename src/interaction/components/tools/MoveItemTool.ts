import { Vector3 } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';
import { AdvancedPlane } from '../../../core/index';
import { ToolType } from '../../utility/tools';

export class moveItemTool extends Component<moveItemTool>{
    plane: AdvancedPlane
    toolType: ToolType
    static schema: ComponentSchema = {
        plane: { type: Types.Ref },
        toolType: { type: Types.Number, default: ToolType.None },
    }
}
