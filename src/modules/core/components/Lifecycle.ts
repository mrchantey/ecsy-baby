import { Component, ComponentSchema, Types } from 'ecsy';
import { BabyEventType } from '../../../types/BabyTypes';
import { BabyEvent } from '../../../utility/BabyEvent';

export class Lifecycle extends Component<Lifecycle> {
	onDispose: BabyEvent

	static schema: ComponentSchema = {
		onDispose: { type: BabyEventType }
	}
}

/*

*/