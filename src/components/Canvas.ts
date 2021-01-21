import { Component, ComponentSchema, Types } from 'ecsy';

export class Canvas extends Component<Canvas> {
	canvas: HTMLCanvasElement

	static schema: ComponentSchema = {
		canvas: { type: Types.Ref }
	}
}