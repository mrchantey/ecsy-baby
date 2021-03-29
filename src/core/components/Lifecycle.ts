import { Component, ComponentSchema, Types } from 'ecsy';
import { BabyEvent, BabyEventType } from '../../base/index';

export class Lifecycle extends Component<Lifecycle> {
	onDispose: BabyEvent

	static schema: ComponentSchema = {
		onDispose: { type: BabyEventType }
	}
}
