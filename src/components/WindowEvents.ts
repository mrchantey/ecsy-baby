import { Component, ComponentSchema, Types } from 'ecsy';
import { iWindowEvents } from '../types/domEvent';

export class WindowEvents extends Component<WindowEvents>{
	events: iWindowEvents = {}
	static schema: ComponentSchema = {
		events: { type: Types.Ref }
	}
}