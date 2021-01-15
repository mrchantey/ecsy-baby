import { Scene } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';

export class SceneComponent extends Component<any> {
	scene: Scene

	static schema: ComponentSchema = {
		scene: { type: Types.Ref }
	}
}