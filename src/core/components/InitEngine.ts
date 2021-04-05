import { EngineOptions } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';

export class InitEngine extends Component<InitEngine> {
    antialias: boolean
    engineOptions: EngineOptions

    static schema: ComponentSchema = {
        antialias: { type: Types.Boolean },
        engineOptions: { type: Types.Ref }
    }
}