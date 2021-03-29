import { Component, ComponentSchema, Types } from 'ecsy';
import { iHtmlEvents } from '../../base';

export class CanvasEvents extends Component<CanvasEvents>{
	events: iHtmlEvents = {}
	static schema: ComponentSchema = {
		events: { type: Types.Ref }
	}
}
