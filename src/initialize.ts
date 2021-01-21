import { ArcRotateCamera, Camera, Engine, EngineOptions, Scene, SceneOptions, Vector3 } from "babylonjs";
import { Component, System, WorldOptions } from "ecsy";
import { CanvasEvents, Mouse, WindowEvents } from ".";
import { BabyWorld } from "./types/world";
import { Canvas, Engine as EngineComp, Node, Scene as SceneComp } from "./Components";
import { Keyboard } from "./components/Keyboard";
import { registerComponents, registerSystems } from "./register";


export interface iInitializeOptions {
	antialias?: boolean
	camera?: Camera
	canvas?: HTMLCanvasElement
	engineOptions?: EngineOptions
	worldOptions?: WorldOptions
	sceneOptions?: SceneOptions,
	components?: Component<any>[],
	systems?: System[]
	//world
	//camera
	//scene
}



export function initialize({ canvas, antialias, engineOptions = {}, worldOptions = {}, sceneOptions = {} }: iInitializeOptions = {}) {

	if (!canvas) {
		canvas = document.getElementsByTagName('canvas')[0]
		if (!canvas) {
			canvas = document.createElement('canvas')
			document.body.appendChild(canvas)
		}
	}
	const engine = new Engine(canvas, antialias, engineOptions)

	const world = new BabyWorld(worldOptions)
	registerComponents(world)
	world.entity
		.addComponent(EngineComp, { engine })
		.addComponent(Canvas, { canvas })
		.addComponent(WindowEvents)
		.addComponent(CanvasEvents)
		// .addComponent(Lifecycle)
		.addComponent(Mouse)
		.addComponent(Keyboard)


	const scene = new Scene(engine, sceneOptions)
	const sceneEntity = world.createEntity('main scene')
		.addComponent(SceneComp, { scene })

	const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
	camera.attachControl(canvas, true);
	const cameraEntity = world.createEntity('camera')
		.addComponent(Node)

	registerSystems(world)

	scene.onDispose = () => world.dispose()

	return {
		engine,
		//engine entity is singleton, access through world
		canvas,
		world,
		scene,
		sceneEntity,
		camera,
		cameraEntity
	}
}