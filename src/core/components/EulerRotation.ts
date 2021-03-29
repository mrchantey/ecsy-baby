import { Quaternion, Vector3 } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';


export class EulerRotation extends Component<EulerRotation> {
	value: Vector3

	static schema: ComponentSchema = {
		value: { type: Types.Ref }
	}
}

