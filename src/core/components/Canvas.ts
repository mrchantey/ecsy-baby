import { Component, ComponentSchema, Types } from 'ecsy';

export class Canvas extends Component<Canvas> {
	value: HTMLCanvasElement

	static schema: ComponentSchema = {
		value: { type: Types.Ref }
	}
}
