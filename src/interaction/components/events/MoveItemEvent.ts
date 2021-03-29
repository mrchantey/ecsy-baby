import { Vector3 } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';
import { BabyTypes } from '../../../core/index';

export class MoveItemEvent extends Component<MoveItemEvent> {
    offset: Vector3

    static schema: ComponentSchema = {
        offset: { type: BabyTypes.Vector3 }

    }

}
