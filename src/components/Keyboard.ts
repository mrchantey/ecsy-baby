import { Component, ComponentSchema, Types } from 'ecsy';


export interface iKeys {
	[key: string]: boolean
}

export class Keyboard extends Component<Keyboard> {
	keysDown: iKeys
	keysPressed: iKeys
	keysUp: iKeys

	static schema: ComponentSchema = {
		keysDown: {
			type: Types.Ref,
			default: {}
		},
		keysPressed: {
			type: Types.Ref,
			default: {}
		},
		keysUp: {
			type: Types.Ref,
			default: {}
		},
	}
}