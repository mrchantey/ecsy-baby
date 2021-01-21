import { Engine as BabylonEngine } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';

export class Engine extends Component<Engine> {
	engine: BabylonEngine

	static schema: ComponentSchema = {
		engine: { type: Types.Ref }
	}
}