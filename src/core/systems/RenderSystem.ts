import { EngineComp, WindowEvents, SceneComp } from "core/components";
import { Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "ecsyExtra";
// import { EngineComp, Render, SceneComp, WindowEvents } from "../components";


export class RenderSystem extends ExtraSystem {


	start() {
		const engine = this.getSingletonComponent(EngineComp)!.value
		const startTime = Date.now() * 0.001
		let lastTime = startTime

		engine.runRenderLoop(() => {
			const time = Date.now() * 0.001
			const delta = time - lastTime
			const elapsed = time - startTime
			lastTime = time
			this.world.execute(delta, elapsed)
		})

		// this.world.execute()
	}


	execute() {

		this.queries.windowEvents.results.forEach(entity => {
			const windowEvents = entity.getComponent(WindowEvents)!.events
			if (windowEvents.resize !== null)
				this.world.entity.getComponent(EngineComp)!.value.resize()
		})
		// const scene = this.getSingletonComponent(SceneComp)!.value
		this.queries.scenes.results.forEach(entity => {
			const scene = entity.getComponent(SceneComp)!.value
			if (scene.activeCamera)
				scene.render()
		})
	}


	// dispose() {
	// 	const engine = this.world.entity.getComponent(EngineComp)?.value
	// 	if (engine !== undefined)
	// 		engine.stopRenderLoop()
	// }

	static queries: SystemQueries = {
		scenes: {
			components: [SceneComp, EngineComp]
		},
		windowEvents: {
			components: [WindowEvents]
		}
	}
}