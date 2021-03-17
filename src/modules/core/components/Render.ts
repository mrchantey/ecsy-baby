import { Scene, Camera, Engine } from "babylonjs";
import { Component, ComponentSchema, Types } from "ecsy";

export class Render extends Component<Render> {
	engine?: Engine
	scene?: Scene
	camera?: Camera
	static schema: ComponentSchema = {
		engine: { type: Types.Ref },
		scene: { type: Types.Ref },
		camera: { type: Types.Ref },
	}
}
