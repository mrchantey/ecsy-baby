import { Component, ComponentSchema, Types } from "ecsy";


export class ValueComponent<componentType, valueType> extends Component<componentType>{
    value: valueType
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}