import { Component, ComponentSchema, Types } from 'ecsy';

class Canvas extends Component<Canvas> {
	value: HTMLCanvasElement

	static schema: ComponentSchema = {
		value: { type: Types.Ref }
	}
}
export {
	Canvas,
}