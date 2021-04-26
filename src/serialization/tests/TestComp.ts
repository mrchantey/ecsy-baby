import { Component, ComponentSchema, Types } from 'ecsy';

export class TestComp extends Component<TestComp> {
    val1: boolean
    val2: string

    static schema: ComponentSchema = {
        val1: { type: Types.Boolean },
        val2: { type: Types.String },
    }
}
export class TestCompIgnore extends Component<TestCompIgnore> {
    static serialize = false

    val1: boolean
    val2: string

    static schema: ComponentSchema = {
        val1: { type: Types.Boolean },
        val2: { type: Types.String },
    }
}
export class TestCompInclude extends Component<TestCompIgnore> {
    static serialize = true

    val1: boolean
    val2: string

    static schema: ComponentSchema = {
        val1: { type: Types.Boolean },
        val2: { type: Types.String },
    }
}