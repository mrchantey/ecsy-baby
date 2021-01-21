import { Scene as BabylonScene } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';

export class Scene extends Component<Scene> {
	scene: BabylonScene

	static schema: ComponentSchema = {
		scene: { type: Types.Ref }
	}
}