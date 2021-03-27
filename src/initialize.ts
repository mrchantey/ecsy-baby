import { ArcRotateCamera, Camera, Engine, EngineOptions, HemisphericLight, Scene, SceneOptions, TargetCamera, Vector3 } from "babylonjs";
import { Component, ComponentConstructor, Entity, System, SystemConstructor, WorldOptions } from "ecsy";
// import { createBabyWorld } from ".";
import { Canvas, createCoreModule, EngineComp, iCoreArgs, SceneComp, TargetCameraComp } from "./modules/core";
import { iModule, ModuleConstructor, registerModules } from "./register";
import { BabyWorld } from "./types/world";



interface iOptions extends iCoreArgs {
	worldOptions?: WorldOptions,
	start?: boolean,
	modules?: iModule[],
	// options: iCoreArgs
}
export function initialize({
	worldOptions = {},
	start = true,
	modules = [],
	...coreOptions
}: iOptions = {}) {

	// const world = createBabyWorld(worldOptions)

	const world = new BabyWorld(worldOptions)
	const allModules = [createCoreModule(coreOptions), ...modules]

	registerModules(world, allModules)

	if (start)
		world.start()

	return {
		world,
		engine: world.entity.getComponent(EngineComp)!.value,
		canvas: world.entity.getComponent(Canvas)!.value,
		camera: world.entity.getComponent(TargetCameraComp)!.value,
		scene: world.entity.getComponent(SceneComp)!.value,
	}
}