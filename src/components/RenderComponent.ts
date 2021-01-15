import { Scene, Camera, Engine } from "babylonjs";
import { Component, Types } from "ecsy";

export class RenderComponent extends Component<any> {
	engine?: Engine
	scene?: Scene
	camera?: Camera
}
RenderComponent.schema = {
	engine: { type: Types.Ref },
	scene: { type: Types.Ref },
	camera: { type: Types.Ref },
};
