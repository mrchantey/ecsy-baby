import { Component, ComponentSchema, Types } from 'ecsy';
import { ExtraEntity } from '../../ecsyExtra/index';

export class Player extends Component<Player> {
    value: ExtraEntity

    static schema: ComponentSchema = {
        value: { type: Types.Ref }
    }
}