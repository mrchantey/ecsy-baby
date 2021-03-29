import { Component, ComponentConstructor, _Entity } from "ecsy";






export class BabyEntity extends _Entity {

    setComponent<C extends Component<any>>(component: ComponentConstructor<C>, values: Partial<Omit<C, keyof Component<any>>> = {}) {
        if (this.hasComponent(component)) {
            const comp = this.getMutableComponent(component)
            Object.assign(comp, values)
            return comp
        }
        else
            return this.addComponent(component, values)
    }

}