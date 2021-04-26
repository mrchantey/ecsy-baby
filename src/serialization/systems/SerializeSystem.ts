import { Component, ComponentConstructor, System, SystemQueries } from "ecsy";
import { SerializedData } from "serialization/components/SerializedData";
import { ToSerialize } from "serialization/components/ToSerialize";
import { getComponentConstructor } from "serialization/utility/utility";







export class SerializeSystem extends System {
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                const { explicitInclude } = entity.getComponent(ToSerialize)!
                entity.removeComponent(ToSerialize)
                // console.log('cachow');

                const componentObj =
                    Object.values(entity.getComponents())
                        .filter(comp => this.checkComponentShouldSerialize(comp, explicitInclude))
                        .reduce((acc, comp) => {
                            const copy = { ...comp } as any
                            delete copy._pool
                            acc[comp.constructor.name] = copy
                            return acc
                        }, {} as any)
                const serialized = JSON.stringify(componentObj)
                entity.addComponent(SerializedData, { value: serialized })
            })
    }

    checkComponentShouldSerialize(comp: Component<any>, explicitInclude: boolean) {
        const constructor = getComponentConstructor(this.world, comp.constructor.name)! as any
        if (constructor.serialize === false)
            return false
        else if (explicitInclude && constructor.serialize === undefined)
            return false
        return true
    }

    static queries: SystemQueries = {
        entities: {
            components: [ToSerialize]
        }
    }
}