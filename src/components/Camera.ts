import { TargetCamera as BabylonCamera } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';

export class Camera extends Component<Camera> {
	camera: BabylonCamera

	static schema: ComponentSchema = {
		camera: { type: Types.Ref }
	}
}