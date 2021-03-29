import { Component, ComponentSchema, Types } from 'ecsy';
import { BabyEvent } from "../utility/BabyEvent";

export class DomEvent extends Component<DomEvent> {
	resize: BabyEvent<UIEvent>

	keyDown: BabyEvent<KeyboardEvent>
	keyUp: BabyEvent<KeyboardEvent>

	mouseMoveCanvas: BabyEvent<MouseEvent>
	mouseDownCanvas: BabyEvent<MouseEvent>
	mouseUpCanvas: BabyEvent<MouseEvent>
	mouseWheelCanvas: BabyEvent<WheelEvent>

	static schema: ComponentSchema = {
		resize: { type: Types.Ref, },

		keyDown: { type: Types.Ref, },
		keyUp: { type: Types.Ref, },

		mouseMoveCanvas: { type: Types.Ref, },
		mouseDownCanvas: { type: Types.Ref, },
		mouseUpCanvas: { type: Types.Ref, },
		mouseWheelCanvas: { type: Types.Ref, },
	}
}
