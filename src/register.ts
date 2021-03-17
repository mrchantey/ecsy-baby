import { BabyWorld } from "./types/world";
import * as TagComponents from "./TagComponents";
import { ComponentConstructor, SystemConstructor } from "ecsy";
import { SceneComp } from "./";
import { Scene } from "babylonjs";


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

export type ModuleConstructor<T> = (args: T) => iModule


export interface iModule {
	components?: ComponentConstructor<any>[]
	systems?: iSystemsToRegister[]
	onComponentsRegistered?: (world: BabyWorld) => any
	onSystemsRegistered?: (world: BabyWorld, scene: Scene) => any
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

	modules
		.filter(m => m.onComponentsRegistered !== undefined)
		.forEach(m => m.onComponentsRegistered!(world))

	modules
		.filter(m => m.systems !== undefined)
		.map(m => m.systems!)
		.flat()
		.sort(compareSystems)
		.map(s => s.systems)
		.flat()
		.forEach(s => world.registerSystem(s))

	const scene = world.entity.getComponent(SceneComp)!.scene

	modules
		.filter(m => m.onSystemsRegistered !== undefined)
		.forEach(m => m.onSystemsRegistered!(world, scene))
}

function compareSystems(a: iSystemsToRegister, b: iSystemsToRegister) {
	if (a.priority < b.priority)
		return -1;
	if (a.priority > b.priority)
		return 1;
	return 0
}
