import { BabyWorld } from "./types/world";
import * as TagComponents from "./TagComponents";
import * as Components from './Components';
import * as Systems from "./Systems";

export function registerComponents(world: BabyWorld) {

	Object.values(TagComponents).forEach((TagComponent) => {
		world.registerComponent(TagComponent);
	});
	Object.values(Components).forEach((component: any, index) => {

		world.registerComponent(component);
	});
}

export function registerSystems(world: BabyWorld) {
	Object.values(Systems).forEach((System) => {
		world.registerSystem(System);
	});
}