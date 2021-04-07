import { Component, ComponentSchema, Types } from 'ecsy';
import { BabyEvent, BabyEventType } from '../../ecsy-extra/index';

export class Lifecycle extends Component<Lifecycle> {
	onDispose: BabyEvent

	static schema: ComponentSchema = {
		onDispose: { type: BabyEventType }
	}
}
