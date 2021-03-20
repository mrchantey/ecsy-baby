import { Vector3 } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';
import { Vector3Type } from '../../../..';

export class MoveItemEvent extends Component<MoveItemEvent> {
    offset: Vector3

    static schema: ComponentSchema = {
        offset: { type: Vector3Type }

    }

}
