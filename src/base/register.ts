import { BabyWorld } from "./types/world";
import { ComponentConstructor, SystemConstructor } from "ecsy";


export const SystemPriorityDelta = 0.05

export enum SystemPriority {
	First = 0,
	BeforeInput = 0.1,
	AfterInput = 0.2,
	BeforeRender = 0.5,
	AfterRender = 0.6,
	BeforeDebug = 0.7,
	AfterDebug = 0.8,
	Last = 1
}

export type ModuleConstructor<T> = (args?: T) => iModule

export interface iSetupArgs {
	[key: string]: any
}


export interface iModule {
	components?: ComponentConstructor<any>[]
	systems?: iSystemsToRegister[]
	onComponentsRegistered?: (world: BabyWorld, setupArgs: iSetupArgs) => any
	onSystemsRegistered?: (world: BabyWorld, setupArgs: iSetupArgs) => any
}

export interface iSystemsToRegister {
	priority: SystemPriority | number,
	systems: SystemConstructor<any>[]
}
// export type iComponentsToRegister = ComponentConstructor<any>[]

export function registerModules(world: BabyWorld, modules: iModule[]) {

	modules
		.filter(m => m.components !== undefined)
		.map(m => m.components!)
		.flat()
		.forEach(c => world.registerComponent(c))

	const setupArgs: iSetupArgs = {}

	modules
		.filter(m => m.onComponentsRegistered !== undefined)
		.forEach(m => m.onComponentsRegistered!(world, setupArgs))

	modules
		.filter(m => m.systems !== undefined)
		.map(m => m.systems!)
		.flat()
		.sort(compareSystems)
		.map(s => s.systems)
		.flat()
		.forEach(s => world.registerSystem(s))

	modules
		.filter(m => m.onSystemsRegistered !== undefined)
		// .forEach(m => m.onSystemsRegistered!(world))
		.forEach(m => m.onSystemsRegistered!(world, setupArgs))
	return setupArgs
}

function compareSystems(a: iSystemsToRegister, b: iSystemsToRegister) {
	if (a.priority < b.priority)
		return -1;
	if (a.priority > b.priority)
		return 1;
	return 0
}
