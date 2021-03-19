import { MeshBuilder } from "babylonjs";
import { SystemQueries } from "ecsy";
import { BabySystem } from "../../../types/system";
import { DebugLines, SceneComp } from "../components";

export class DebugSystem extends BabySystem {
	beforeRender() {
		const debugLines = this.getMutableSingletonComponent(DebugLines)
		if (debugLines == undefined)
			return;

		if (debugLines.needsNewInstance) {
			const scene = this.getSingletonComponent(SceneComp).value
			debugLines.options.instance = undefined;
			debugLines.options.instance = (<any>MeshBuilder).CreateLineSystem("guides", debugLines.options, scene)
		} else if (debugLines.needsRedraw) {
			(<any>MeshBuilder).CreateLineSystem("guides", debugLines.options)
		}
		debugLines.needsNewInstance = false
		debugLines.needsRedraw = false
		if (debugLines.clearEachFrame)
			debugLines.clear()
	}




	static queries: SystemQueries = {}
}