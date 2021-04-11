import { Vector3 } from 'babylonjs';
import { AdvancedPlane } from 'core';
import { Component, ComponentSchema, Types } from 'ecsy';

export class MoveItemTool extends Component<MoveItemTool>{
    plane: AdvancedPlane
    // toolType: ToolType
    static schema: ComponentSchema = {
        plane: { type: Types.Ref },
        _pool: { type: Types.Ref }
    }
}
