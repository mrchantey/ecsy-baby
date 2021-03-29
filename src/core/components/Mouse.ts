import { Component, ComponentSchema, Types } from 'ecsy';

export class Mouse extends Component<Mouse> {
	mouseOver: boolean
	mouseStay: boolean
	mouseOut: boolean
	leftButtonDown: boolean
	leftButtonHeld: boolean
	leftButtonUp: boolean
	xDownNorm: number
	yDownNorm: number
	xnorm: number
	ynorm: number
	xsign: number
	ysign: number
	xdelta: number
	ydelta: number
	xWheelSign: number
	yWheelSign: number

	static schema: ComponentSchema = {
		mouseOver: { type: Types.Boolean, default: false },
		mouseStay: { type: Types.Boolean, default: false },
		mouseOut: { type: Types.Boolean, default: false },
		leftButtonDown: { type: Types.Boolean, default: false },
		leftButtonHeld: { type: Types.Boolean, default: false },
		leftButtonUp: { type: Types.Boolean, default: false },
		xDownNorm: { type: Types.Number, default: 0.5 },
		yDownNorm: { type: Types.Number, default: 0.5 },
		xnorm: { type: Types.Number, default: 0.5 },
		ynorm: { type: Types.Number, default: 0.5 },
		xsign: { type: Types.Number, default: 0 },
		ysign: { type: Types.Number, default: 0 },
		xdelta: { type: Types.Number, default: 0 },
		ydelta: { type: Types.Number, default: 0 },
		xWheelSign: { type: Types.Number, default: 0 },
		yWheelSign: { type: Types.Number, default: 0 },
	}

}