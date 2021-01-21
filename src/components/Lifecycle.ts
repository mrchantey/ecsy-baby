import { Component, ComponentSchema, Types } from 'ecsy';
import { BabyTypes } from '..';
import { BabyEvent } from '../utility/BabyEvent';

export class Lifecycle extends Component<Lifecycle> {
	onDispose: BabyEvent

	static schema: ComponentSchema = {
		onDispose: { type: BabyTypes.BabyEvent }
	}
}

/*

*/