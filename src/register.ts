import { BabyWorld } from "./types/world";
import * as TagComponents from "./TagComponents";
import * as Components from './Components';
import * as Systems from "./Systems";
import { ComponentConstructor, SystemConstructor } from "ecsy";

export function registerComponents(world: BabyWorld, components?: ComponentConstructor<any>[]) {

	Object.values(TagComponents).forEach((TagComponent) => {
		world.registerComponent(TagComponent);
	});
	Object.values(Components).forEach((component: any, index) => {

		world.registerComponent(component);
	});
	if (components)
		components.forEach(component => world.registerComponent(component))
}


export function registerSystems(world: BabyWorld, systems?: SystemConstructor<any>[]) {
	Object.values(Systems).forEach((System) => {
		world.registerSystem(System);
	});
	if (systems)
		systems.forEach(system => world.registerSystem(system))
}
