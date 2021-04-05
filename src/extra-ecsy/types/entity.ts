import { Component, ComponentConstructor, _Entity } from "ecsy";
import { ValueComponent } from "./valueComponent";






export class ExtraEntity extends _Entity {

    setComponent<C extends Component<any>>(component: ComponentConstructor<C>, values: Partial<Omit<C, keyof Component<any>>> = {}) {
        if (this.hasComponent(component)) {
            const comp = this.getMutableComponent(component)
            Object.assign(comp, values)
            return comp
        }
        else
            return this.addComponent(component, values)
    }

    getComponentValue<C extends ValueComponent<any, any>>(component: ComponentConstructor<C>) {
        return this.getComponent(component)?.value
    }
    addComponentValue<C extends ValueComponent<any, valueType>, valueType>(component: ComponentConstructor<C>, value: valueType) {
        const values = { value } as Partial<Omit<C, keyof Component<any>>>
        this.addComponent(component, values)
    }
    setComponentValue<C extends ValueComponent<any, valueType>, valueType>(component: ComponentConstructor<C>, value: valueType) {
        const values = { value } as Partial<Omit<C, keyof Component<any>>>
        this.setComponent(component, values)
    }


}