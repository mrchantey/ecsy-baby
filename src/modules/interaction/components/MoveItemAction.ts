import { Vector3 } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';
import { Vector3Type } from '../../..';

export class MoveItemAction extends Component<MoveItemAction> {
    lastPoint: Vector3

    static schema: ComponentSchema = {
        lastPoint: { type: Vector3Type }

    }
}