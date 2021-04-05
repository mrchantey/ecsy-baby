import { MeshBuilder } from "babylonjs";
import { SystemQueries } from "ecsy";
import { ExtraSystem } from "../../extra-ecsy/index";
// import { DebugLines } from "../components/DebugLines";
import { DebugLines, SceneComp } from "../components";

export class DebugSystem extends ExtraSystem {
	execute() {
		this.queries.initialized.results.forEach(entity => {

			const debugLines = entity.getMutableComponent(DebugLines)!

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
		})
	}




	static queries: SystemQueries = {
		initialized: {
			components: [DebugLines]
		}
	}
}


// debug(debugLines: DebugLines) {
// 	debugLines.addLine(this.origin, this.origin.add(this.tangent), Color4Ext.Red())
// 	debugLines.addLine(this.origin, this.origin.add(this.bitangent), Color4Ext.Green())
// 	debugLines.addLine(this.origin, this.origin.add(this.normal), Color4Ext.Blue())
// }