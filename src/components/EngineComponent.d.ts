import { Engine } from 'babylonjs';
import { Component, ComponentSchema } from 'ecsy';
export declare class EngineComponent extends Component<any> {
    engine: Engine;
    static schema: ComponentSchema;
}
