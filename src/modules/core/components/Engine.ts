import { Engine as BabylonEngine } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';


class Engine extends Component<Engine> {
	engine: BabylonEngine

	static schema: ComponentSchema = {
		engine: { type: Types.Ref }
	}
}

export {
	Engine,
	Engine as EngineComp
}