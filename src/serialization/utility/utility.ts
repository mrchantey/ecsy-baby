import { ComponentConstructor, World } from "ecsy";

interface iHasComponentsManager {
    componentsManager: {
        Components: ComponentConstructor<any>[]
    }
}


export function getComponentConstructor(world: World, key: string) {
    return (world as any as iHasComponentsManager).componentsManager.Components
        .find(c => c.name === key)
}