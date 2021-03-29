import { MeshBuilder } from "babylonjs";
import { SystemQueries } from "ecsy";
import { BabySystem } from "../../base/index";
import { DebugLines, SceneComp } from "../components";

export class DebugSystem extends BabySystem {
	beforeRender() {
		const debugLines = this.getMutableSingletonComponent(DebugLines)
		if (debugLines == undefined)
			return;

		if (debugLines.needsNewInstance) {
			const scene = this.getSingletonComponent(SceneComp).value
			//dont we need to dispose the instance
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


// debug(debugLines: DebugLines) {
// 	debugLines.addLine(this.origin, this.origin.add(this.tangent), Color4Ext.Red())
// 	debugLines.addLine(this.origin, this.origin.add(this.bitangent), Color4Ext.Green())
// 	debugLines.addLine(this.origin, this.origin.add(this.normal), Color4Ext.Blue())
// }