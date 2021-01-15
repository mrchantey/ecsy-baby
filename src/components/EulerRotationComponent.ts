import { Quaternion, Vector3 } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';


export class EulerRotation extends Component<any> {
	value: Vector3

	static schema: ComponentSchema = {
		value: { type: Types.Ref }
	}
}

