import { Component, ComponentSchema, Types } from 'ecsy';

export class Mouse extends Component<Mouse> {
	leftButtonDown: boolean
	leftButtonHeld: boolean
	leftButtonUp: boolean
	xnorm: number
	ynorm: number
	xsign: number
	ysign: number
	xWheelSign: number
	yWheelSign: number

	static schema: ComponentSchema = {
		leftButtonDown: {
			type: Types.Boolean,
			default: false
		},
		leftButtonHeld: {
			type: Types.Boolean,
			default: false
		},
		leftButtonUp: {
			type: Types.Boolean,
			default: false
		},
		xnorm: {
			type: Types.Number,
			default: 0.5
		},
		ynorm: {
			type: Types.Number,
			default: 0.5
		},
		xsign: {
			type: Types.Number,
			default: 0
		},
		ysign: {
			type: Types.Number,
			default: 0
		},
		xWheelSign: {
			type: Types.Number,
			default: 0
		},
		yWheelSign: {
			type: Types.Number,
			default: 0
		},
	}

}