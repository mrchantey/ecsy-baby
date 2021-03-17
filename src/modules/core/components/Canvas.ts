import { Component, ComponentSchema, Types } from 'ecsy';

class Canvas extends Component<Canvas> {
	canvas: HTMLCanvasElement

	static schema: ComponentSchema = {
		canvas: { type: Types.Ref }
	}
}
export {
	Canvas,
}