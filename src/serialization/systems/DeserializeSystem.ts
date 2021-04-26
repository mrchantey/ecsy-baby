import { ComponentConstructor, Entity, System, SystemQueries } from "ecsy";
import { SerializedData } from "serialization/components/SerializedData";
import { ToDeserialize } from "serialization/components/ToDeserialize";
import { getComponentConstructor } from "serialization/utility/utility";




export class DeserializeSystem extends System {
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                entity.removeComponent(ToDeserialize)
                const serialized = entity.getComponent(SerializedData)!.value
                const componentsObj = JSON.parse(serialized)
                Object.entries(componentsObj)
                    .forEach(([key, value]: [string, any]) => this.tryAddComponent(entity, key, value))
            })
    }

    tryAddComponent(entity: Entity, key: string, value: any) {
        {
            const component = getComponentConstructor(this.world, key)
            if (component === undefined)
                console.error(`Attempt to deserialize unknown component: ${key}`)
            else
                entity.addComponent(component, value)
        }
    }

    static queries: SystemQueries = {
        entities: {
            components: [SerializedData, ToDeserialize]
        }
    }
}