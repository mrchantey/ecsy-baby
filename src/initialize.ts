import { ArcRotateCamera, Camera, Engine, EngineOptions, HemisphericLight, Scene, SceneOptions, TargetCamera, Vector3 } from "babylonjs";
import { Component, ComponentConstructor, Entity, System, SystemConstructor, WorldOptions } from "ecsy";
import { BabyWorld, createBabyWorld } from "./types/world";
import { Keyboard } from "./modules/core/components/Keyboard";
import { iModule, ModuleConstructor, registerModules } from "./register";
import { DebugLines } from "./modules/core/components/DebugLines";
import { Canvas, CameraComp, createCoreModule, EngineComp, iCoreArgs, SceneComp } from "./modules/core";
// import { SceneComp } from "./modules/core/components/Scene";
// import { EngineComp } from "./modules/core/components/Engine";
// import { CanvasComp } from "./modules/core/components/Canvas";
// import { CameraComp } from "./modules/core/components/Camera";



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

	const world = createBabyWorld(worldOptions)

	const allModules = [createCoreModule(coreOptions), ...modules]

	registerModules(world, allModules)

	const scene = world.entity.getComponent(SceneComp)!.scene
	scene.onDispose = () => world.dispose()

	if (start)
		world.start()

	return {
		world,
		engine: world.entity.getComponent(EngineComp)!.engine,
		canvas: world.entity.getComponent(Canvas)!.canvas,
		camera: world.entity.getComponent(CameraComp)!.camera,
		scene: world.entity.getComponent(SceneComp)!.scene,
	}
}