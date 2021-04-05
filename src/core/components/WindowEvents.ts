import { Component, ComponentSchema, Types } from 'ecsy';
import { iWindowEvents } from '../../extra-ecsy';

export class WindowEvents extends Component<WindowEvents>{
	events: iWindowEvents
	bla: boolean
	static schema: ComponentSchema = {
		// bla: { type: Types.Boolean }
		events: { type: Types.Ref }
	}
}

