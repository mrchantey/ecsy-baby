import { Component, ComponentSchema, Types } from 'ecsy';
import { BabyEntity } from '../../..';

export class Player extends Component<Player> {
    value: BabyEntity

    static schema: ComponentSchema = {
        value: { type: Types.Ref }
    }
}