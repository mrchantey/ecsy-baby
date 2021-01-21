
import { Attributes, Entity, System, World } from "ecsy";
import { Render, Engine, WindowEvents } from "../Components";
import { BabyEntity } from "../types/entity";
import { BabySystem } from "../types/system";
import { Scene } from "../components/Scene";

export class RenderSystem extends BabySystem {

	init() {

		const engine = this.world.entity.getComponent(Engine)!.engine

		const startTime = Date.now() * 0.001
		let lastTime = startTime

		this.world.start()

		engine.runRenderLoop(() => {
			const time = Date.now() * 0.001
			const delta = time - lastTime
			const elapsed = time - startTime
			lastTime = time
			this.world.execute(delta, elapsed)
			this.world.postExecute()
		})
	}

	execute() {
		const windowEvents = this.world.entity.getComponent(WindowEvents)!.events
		if (windowEvents.resize !== null)
			this.world.entity.getComponent(Engine)!.engine.resize()

		this.queries.scenes.results.forEach(entity => {
			// console.log('bang');
			const scene = entity.getComponent(Scene)!.scene
			if (scene.activeCamera)
				scene.render()

			// 	const render = entity.getComponent(RenderComponent)!;
			// 	const camera = render.camera!
			// 	const scene = render.scene!
			// 	const engine = render.engine!
			// 	if (this.needsResize) {
			// 		// engine.resize()
			// 		// const canvasRect = engine.getRenderingCanvasClientRect()!
			// 		//update engine pixel ratio?
			// 		//https://doc.babylonjs.com/divingDeeper/scene/optimize_your_scene#turning-adapttodeviceratio-offon
			// 		// update aspect ratio
			// 		// camera.fov = canvasRect.width / canvasRect.height
			// 	}
			// 	// engine.runRenderLoop()
		})

	}

	static queries = {
		scenes: { components: [Scene] },
	}

}