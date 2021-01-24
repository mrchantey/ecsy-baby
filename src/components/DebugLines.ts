import { Color4, Vector3, Color3 } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';
import { iLineSystemOptions } from '../types/extensions';
import { Color4Ext } from '../utility/Math';

export class DebugLines extends Component<DebugLines> {
	options: iLineSystemOptions = {
		lines: [],
		colors: [],
		updatable: true
	}
	lineIndex: number = 0
	needsRedraw: boolean = true
	needsNewInstance: boolean = true
	clearEachFrame: boolean = true


	clear() {
		for (let i = 0; i < this.options.lines.length; i++) {
			this.options.colors![i] = [new Color4(0, 0, 0, 0), new Color4(0, 0, 0, 0)]
			this.options.lines![i] = [new Vector3(0, 0, 0), new Vector3(0, 0, 0)]
		}
		this.needsRedraw = true
		this.lineIndex = 0
	}

	addGizmo(origin: Vector3, x: Vector3, y: Vector3, z: Vector3) {
		this.addLine(origin, origin.add(x), Color4Ext.Red())
		this.addLine(origin, origin.add(y), Color4Ext.Green())
		this.addLine(origin, origin.add(z), Color4Ext.Blue())
	}

	addLine(a: Vector3, b: Vector3, colA: Color4 = Color4.FromColor3(Color3.White()), colB?: Color4) {
		this.needsRedraw = true
		colB = colB || colA.clone()

		if (this.lineIndex === this.options.lines.length) {
			this.needsNewInstance = true
			const targetLength = this.options.lines.length * 2
			while (this.options.lines.length < targetLength) {
				this.options.lines.push([Vector3.Zero(), Vector3.Zero()])
				this.options.colors!.push([new Color4(0, 0, 0, 0), new Color4(0, 0, 0, 0)])
			}
		}
		this.options.lines[this.lineIndex] = [a, b]
		this.options.colors![this.lineIndex] = [colA, colB]
		this.lineIndex++
	}

	static schema: ComponentSchema = {
		options: { type: Types.Ref },
		lineIndex: { type: Types.Number, default: 0 },
		needsRedraw: { type: Types.Boolean, default: true },
		needsNewInstance: { type: Types.Boolean, default: true },
		clearEachFrame: { type: Types.Boolean, default: true },
	}
}