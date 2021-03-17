import { TransformNode as BabylonTransformNode } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';

class TransformNode extends Component<TransformNode> {
    value: BabylonTransformNode

    static schema: ComponentSchema = {
        value: { type: Types.Ref },
    }
}
export {
    TransformNode,
    TransformNode as TransformNodeComp
}