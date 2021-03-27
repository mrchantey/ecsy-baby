import { SystemQueries } from "ecsy";
import { BabySystem } from "../../../types/system";
import { EngineComp, SceneComp, WindowEvents } from "../components";


export class RenderSystem extends BabySystem {

	start() {
		const engine = this.world.entity.getComponent(EngineComp)!.value

		const startTime = Date.now() * 0.001
		let lastTime = startTime

		engine.runRenderLoop(() => {
			const time = Date.now() * 0.001
			const delta = time - lastTime
			const elapsed = time - startTime
			lastTime = time
			this.world.execute(delta, elapsed)
			this.world.beforeRender()
			this.render()
			this.world.afterRender()
		})
	}

	stop() {
		const engine = this.world.entity.getComponent(EngineComp)!.value
		engine.stopRenderLoop()
	}

	execute() {
		const windowEvents = this.world.entity.getComponent(WindowEvents)!.events
		if (windowEvents.resize !== null)
			this.world.entity.getComponent(EngineComp)!.value.resize()
	}

	render() {
		const scene = this.getSingletonComponent(SceneComp)!.value
		if (scene.activeCamera)
			scene.render()


		// this.queries.scenes.results.forEach(entity => {
		// 	const scene = entity.getComponent(SceneComp)!.value
		// 	if (scene.activeCamera)
		// 		scene.render()
		// })
	}




	// static queries: SystemQueries = {
	// 	scenes: {
	// 		components: [SceneComp]
	// 	}
	// }
}