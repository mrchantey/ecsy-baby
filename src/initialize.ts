import { ArcRotateCamera, Camera, Engine, EngineOptions, Scene, SceneOptions, UniversalCamera, Vector3 } from "babylonjs";
import { World, WorldOptions } from "ecsy";
import { BabyWorld } from "./base-types/world";
import { EngineComponent } from "./components/EngineComponent";
import { NodeComponent } from "./components/NodeComponent";
import { SceneComponent } from "./components/SceneComponent";
import { registerComponents, registerSystems } from "./register";


export interface iInitializeOptions {
	antialias?: boolean
	camera?: Camera
	canvas?: HTMLCanvasElement
	engineOptions?: EngineOptions
	worldOptions?: WorldOptions
	sceneOptions?: SceneOptions
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


	// world = world || new BabyWorld(options)
	const world = new BabyWorld(worldOptions)
	registerComponents(world)
	world.entity
		.addComponent(EngineComponent, { engine })


	const scene = new Scene(engine, sceneOptions)
	const sceneEntity = world.createEntity('main scene')
		.addComponent(SceneComponent, { scene })

	// const camera = new UniversalCamera("camera", new Vector3(-1, 0, 0), scene)
	const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
	camera.attachControl(canvas, true);
	const cameraEntity = world.createEntity('camera')
		.addComponent(NodeComponent)

	registerSystems(world)
	// const newworld = new World()
	// world.reig

	return {
		engine,
		canvas,
		world,
		scene,
		sceneEntity,
		camera,
		cameraEntity
	}
}

// import { ECSYThreeWorld } from "./world.js";
// import { WebGLRendererSystem } from "./systems/WebGLRendererSystem.js";
// import { WebGLRendererComponent } from "./components/WebGLRendererComponent.js";
// import { PerspectiveCamera, Scene, WebGLRenderer, Clock } from "three";

// export function initialize(world, options = {}) {
//   let { renderer, animationLoop } = options;

//   if (!world) {
//     world = new ECSYThreeWorld();
//   }

//   world
//     .registerComponent(WebGLRendererComponent)
//     .registerSystem(WebGLRendererSystem, { priority: 999 });

//   if (!renderer) {
//     renderer = new WebGLRenderer({
//       antialias: true,
//     });

//     document.body.appendChild(renderer.domElement);
//   }

//   if (!animationLoop) {
//     const clock = new Clock();
//     animationLoop = () => {
//       world.execute(clock.getDelta(), clock.elapsedTime);
//     };
//   }

//   renderer.setAnimationLoop(animationLoop);

//   const scene = new Scene();
//   const sceneEntity = world.createEntity().addObject3DComponent(scene);

//   const camera = new PerspectiveCamera(
//     90,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   const cameraEntity = world
//     .createEntity()
//     .addObject3DComponent(camera, sceneEntity);

//   const rendererEntity = world
//     .createEntity()
//     .addComponent(WebGLRendererComponent, {
//       scene: sceneEntity,
//       camera: cameraEntity,
//       renderer: renderer,
//     });

//   return {
//     world,
//     camera,
//     scene,
//     renderer,
//     sceneEntity,
//     cameraEntity,
//     rendererEntity,
//   };
// }
