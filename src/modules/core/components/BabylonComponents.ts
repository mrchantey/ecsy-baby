
import { Engine, Scene, TargetCamera, Node, TransformNode, StandardMaterial } from 'babylonjs'
import { Component, ComponentConstructor, ComponentSchema, Types } from 'ecsy';

export class EngineComp extends Component<EngineComp> {
    value: Engine
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}
export class SceneComp extends Component<SceneComp> {
    value: Scene
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}
export class TargetCameraComp extends Component<TargetCameraComp> {
    value: TargetCamera
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}
export class NodeComp extends Component<NodeComp> {
    value: Node
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}
export class TransformNodeComp extends Component<TransformNodeComp> {
    value: TransformNode
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}
export class StandardMaterialComp extends Component<StandardMaterialComp> {
    value: StandardMaterial
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}