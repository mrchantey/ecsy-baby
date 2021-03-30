
import { Engine, Scene, TargetCamera, Node, TransformNode, StandardMaterial } from 'babylonjs'
import { Component, ComponentConstructor, ComponentSchema, Types } from 'ecsy';
import { ValueComponent } from '../../base';

export class EngineComp extends ValueComponent<EngineComp, Engine> {
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}
export class SceneComp extends ValueComponent<SceneComp, Scene> {
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}
export class TargetCameraComp extends ValueComponent<TargetCameraComp, TargetCamera> {
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}
export class NodeComp extends ValueComponent<NodeComp, Node> {
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}
export class TransformNodeComp extends ValueComponent<TransformNodeComp, TransformNode> {
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}
export class StandardMaterialComp extends ValueComponent<StandardMaterialComp, StandardMaterial> {
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}