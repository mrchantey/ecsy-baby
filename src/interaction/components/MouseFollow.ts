import { Vector3 } from 'babylonjs';
import { BabyTypes } from 'core';
import { Component, ComponentSchema, Types } from 'ecsy';

export class MouseFollow extends Component<MouseFollow> {
    offset: Vector3
    depth: number

    static schema: ComponentSchema = {
        offset: { type: BabyTypes.Vector3 },
        depth: { type: Types.Number, default: 0.3 }
    }
}