
import { Attributes, Entity, System, World } from "ecsy";
import { RenderComponent, EngineComponent } from "../Components";
import { BabyEntity } from "../base-types/entity";
import { BabySystem } from "../base-types/system";
import { SceneComponent } from "../components/SceneComponent";

export class RenderSystem extends BabySystem {
	needsResize: boolean = false

	onResize() {
		this.needsResize = true;
	}

	init() {

		const engine = this.world.entity.getComponent(EngineComponent)!.engine

		const startTime = Date.now() * 0.001
		let lastTime = startTime
		engine.runRenderLoop(() => {
			const time = Date.now() * 0.001
			const delta = time - lastTime
			const elapsed = time - startTime
			lastTime = time
			this.world.execute(delta, elapsed)
		})

		this.needsResize = true;
		this.onResize = this.onResize.bind(this);
		window.addEventListener("resize", this.onResize, false);
	}

	dispose() {
		window.removeEventListener("resize", this.onResize);
	}

	execute() {
		if (this.needsResize) {
			const engine = this.world.entity.getComponent(EngineComponent)!.engine
			engine.resize()
			this.needsResize = false;
		}

		this.queries.scenes.results.forEach(entity => {
			// console.log('bang');
			const scene = entity.getComponent(SceneComponent)!.scene
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
		scenes: { components: [SceneComponent] },
	}

	// 	renderer.render(scene, camera);
	// }
	// 	}
}

// RenderSystem.queries = {
// };
