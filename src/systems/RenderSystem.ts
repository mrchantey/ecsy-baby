
import { Attributes, Entity, System, World } from "ecsy";
import { Render, Engine, WindowEvents } from "../Components";
import { BabyEntity } from "../types/entity";
import { BabySystem } from "../types/system";
import { Scene } from "../components/Scene";

export class RenderSystem extends BabySystem {

	start() {
		const engine = this.world.entity.getComponent(Engine)!.engine

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

	execute() {
		const windowEvents = this.world.entity.getComponent(WindowEvents)!.events
		if (windowEvents.resize !== null)
			this.world.entity.getComponent(Engine)!.engine.resize()
	}

	render() {
		this.queries.scenes.results.forEach(entity => {
			const scene = entity.getComponent(Scene)!.scene
			if (scene.activeCamera)
				scene.render()
		})
	}

	static queries = {
		scenes: { components: [Scene] },
	}

}