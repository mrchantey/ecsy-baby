import { Component, ComponentSchema, Types } from 'ecsy';
import { iWindowEvents } from '../../ecsy-extra';

export class WindowEvents extends Component<WindowEvents>{
	events: iWindowEvents = {}
	static schema: ComponentSchema = {
		events: { type: Types.Ref }
	}
}

