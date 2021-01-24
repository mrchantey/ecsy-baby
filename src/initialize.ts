import { ArcRotateCamera, Camera, Engine, EngineOptions, HemisphericLight, Scene, SceneOptions, TargetCamera, Vector3 } from "babylonjs";
import { Component, ComponentConstructor, Entity, System, SystemConstructor, WorldOptions } from "ecsy";
import { CanvasEvents, Mouse, WindowEvents } from ".";
import { BabyWorld } from "./types/world";
import { Canvas, Engine as EngineComp, Node, Scene as SceneComp, Camera as CameraComp } from "./Components";
import { Keyboard } from "./components/Keyboard";
import { registerComponents, registerSystems } from "./register";
import { DebugLines } from "./components/DebugLines";


export interface iInitializeOptions {
	antialias?: boolean
	canvas?: HTMLCanvasElement
	engineOptions?: EngineOptions
	worldOptions?: WorldOptions
	sceneOptions?: SceneOptions,
	components?: ComponentConstructor<any>[],
	systems?: SystemConstructor<any>[]
	start?: boolean
	createCamera?: (scene: Scene, canvas: HTMLCanvasElement) => TargetCamera
	createLight?: boolean
	//world
	//camera
	//scene
}


function createDefaultCamera(scene: Scene, canvas: HTMLCanvasElement) {
	const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 5, new Vector3(0, 0, 0), scene);
	camera.attachControl(canvas, true);
	return camera
}


export function initialize({
	antialias,
	canvas,
	engineOptions = {},
	worldOptions = {},
	sceneOptions = {},
	components,
	systems,
	createCamera = createDefaultCamera,
	start = true,
	createLight = true,
}: iInitializeOptions = {}) {

	if (!canvas) {
		canvas = document.getElementsByTagName('canvas')[0]
		if (!canvas) {
			canvas = document.createElement('canvas')
			document.body.appendChild(canvas)
		}
	}
	const engine = new Engine(canvas, antialias, engineOptions)
	const scene = new Scene(engine, sceneOptions)
	const camera = createCamera(scene, canvas)

	const world = new BabyWorld(worldOptions)
	registerComponents(world, components)

	world.entity
		.addComponent(EngineComp, { engine })
		.addComponent(Canvas, { canvas })
		.addComponent(SceneComp, { scene })
		.addComponent(CameraComp, { camera })
		.addComponent(WindowEvents)
		.addComponent(CanvasEvents)
		.addComponent(Mouse)
		.addComponent(Keyboard)
		.addComponent(DebugLines)

	registerSystems(world, systems)

	scene.onDispose = () => world.dispose()

	if (createLight) {
		const light = new HemisphericLight("light", new Vector3(0, 10, -5), scene)
	}


	if (start)
		world.start()

	return {
		engine,		//engine entity is singleton, access through world
		canvas,
		world,
		scene,
		camera,
	}
}