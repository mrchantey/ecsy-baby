import { Vector3 } from 'babylonjs';
import { BabyTypes } from 'core';
import { Component, ComponentSchema, Types } from 'ecsy';

export class MouseFollow extends Component<MouseFollow> {
    offset: Vector3
    depth: number

    static schema: ComponentSchema = {
        offset: { type: BabyTypes.Vector3, default: new Vector3(0, -0.3, 1.3) },
        depth: { type: Types.Number, default: 4 }
    }
}