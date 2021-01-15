import { Engine } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';

export class EngineComponent extends Component<any> {
	engine: Engine

	static schema: ComponentSchema = {
		engine: { type: Types.Ref }
	}
}