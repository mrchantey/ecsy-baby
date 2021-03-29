import { Component, ComponentSchema, Types } from 'ecsy';
import { ToolType } from '../../utility/tools';

export class ViewTool extends Component<ViewTool>  {
    toolType: ToolType
    static schema: ComponentSchema = {
        toolType: { type: Types.Number, default: ToolType.None }
    }
}

















