import { Component, ComponentConstructor, Entity, System, SystemConstructor, WorldOptions } from "ecsy";
import { BabyWorld, registerModules, iModule } from "../base/index";
import { iCoreArgs, createCoreModule } from "./module";



interface iOptions {
	worldOptions?: WorldOptions,
	start?: boolean,
	modules?: iModule[],
	coreOptions?: iCoreArgs
}
export function initialize({
	worldOptions = {},
	start = true,
	modules = [],
	coreOptions = {}
}: iOptions = {}) {

	const world = new BabyWorld(worldOptions)
	const allModules = [createCoreModule(coreOptions), ...modules]

	const setupArgs = registerModules(world, allModules)

	if (start)
		world.start()

	return {
		world,
		...setupArgs
	}
}