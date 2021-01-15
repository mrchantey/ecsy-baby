import { Node } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';

export class NodeComponent extends Component<Node> {
	// value: Node

	static schema: ComponentSchema = {
		value: { type: Types.Ref }
	}
}