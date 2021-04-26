import { ComponentConstructor, SystemConstructor } from "ecsy"


export const SystemPriorityDelta = 0.05

export enum SystemPriority {
    First = 0,
    Early = 0.25,
    Middle = 0.5,
    Late = 0.75,
    Last = 1
}



export interface iSetupArgs {
    [key: string]: any
}

export type ModuleConstructor<T> = (args?: T) => iModule

export interface iSystemGroup {
    priority: SystemPriority | number,
    systems: SystemConstructor<any>[]
}
export interface iModule {
    components?: ComponentConstructor<any>[]
    systemGroups?: iSystemGroup[]
    // onComponentsRegistered?: (world: ExtraWorld, setupArgs: iSetupArgs) => any
    // onSystemsRegistered?: (world: ExtraWorld, setupArgs: iSetupArgs) => any
}

