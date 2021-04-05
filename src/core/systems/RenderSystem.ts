import { Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "../../extra-ecsy/index";
import { EngineComp, SceneComp } from "../components/BabylonComponents";
import { Render } from "../components/Render";
import { WindowEvents } from "../components/WindowEvents";
// import { EngineComp, Render, SceneComp, WindowEvents } from "../components";


export class RenderSystem extends ExtraSystem {

	start() {
	}

	stop() {
		const engine = this.world.entity.getComponent(EngineComp)?.value
		if (engine !== undefined)
			engine.stopRenderLoop()
	}

	execute() {
		this.queries.enginesToRun.results.forEach(entity => {
			const engine = entity.getComponent(EngineComp)!.value
			const startTime = Date.now() * 0.001
			let lastTime = startTime

			engine.runRenderLoop(() => {
				const time = Date.now() * 0.001
				const delta = time - lastTime
				const elapsed = time - startTime
				lastTime = time
				this.world.execute(delta, elapsed)
			})

			entity.addComponent(Render)
		})

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



	static queries: SystemQueries = {
		enginesToRun: {
			components: [EngineComp, Not(Render)]
		},
		scenes: {
			components: [SceneComp, EngineComp, Render]
		},
		windowEvents: {
			components: [WindowEvents]
		}
	}
}