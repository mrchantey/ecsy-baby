import { Node as BabylonNode } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';

class Node extends Component<Node> {
	value: BabylonNode

	static schema: ComponentSchema = {
		value: { type: Types.Ref },
	}
}

export {
	Node,
	Node as NodeComp
}