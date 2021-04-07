import { ExtraWorld } from "./types/world";
import { ComponentConstructor, SystemConstructor } from "ecsy";
import { iModule, iSetupArgs } from ".";
import { iSystemGroup } from "./types";


// export type iComponentsToRegister = ComponentConstructor<any>[]

export function registerModules(world: ExtraWorld, modules: iModule[]) {

	modules
		.filter(m => m.components !== undefined)
		.map(m => m.components!)
		.flat()
		.forEach(c => world.registerComponent(c))

	modules
		.filter(m => m.systemGroups !== undefined)
		.map(m => m.systemGroups!)
		.flat()
		.sort(compareSystems)
		.map(s => s.systems)
		.flat()
		.forEach(s => world.registerSystem(s))
}

function compareSystems(a: iSystemGroup, b: iSystemGroup) {
	if (a.priority < b.priority)
		return -1;
	if (a.priority > b.priority)
		return 1;
	return 0
}
