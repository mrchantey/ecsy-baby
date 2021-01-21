import { World, WorldOptions } from "ecsy";
import { BabyEntity } from "./entity";
import { BabySystem } from "./system";
// import { Object3DComponent } from "./components/Object3DComponent.js";


export class BabyWorld extends World<BabyEntity> {
	entity: BabyEntity
	systemsStart: BabySystem[]
	systemsPostExecute: BabySystem[]
	systemsDispose: BabySystem[]

	constructor(options: WorldOptions) {
		super(options)
		// super(
		// 	Object.assign({ entityClass: BabyWorld, }, options)
		// );
		this.entity = this.createEntity("singleton")
	}

	start() {
		const systems = this.getSystems() as BabySystem[]
		this.systemsStart = systems.filter(s => s.start !== undefined)
		this.systemsPostExecute = systems.filter(s => s.postExecute !== undefined)
		this.systemsDispose = systems.filter(s => s.dispose !== undefined)

		// console.dir(this.systemsPostExecute.length);
		this.systemsStart.forEach(s => s.start())
	}

	postExecute() {
		this.systemsPostExecute.forEach(s => s.postExecute())
	}
	dispose() {
		this.systemsDispose.forEach(s => s.dispose())
		// 	// this.entity.getComponent(Lifecycle)?.onDispose.invoke()
	}
}


/*
onBeforeAnimationsObservable
onAfterAnimationsObservable
onBeforePhysicsObservable
onAfterPhysicsObservable
			onBeforeRenderObservable
onBeforeRenderTargetsRenderObservable
onAfterRenderTargetsRenderObservable
onBeforeCameraRenderObservable
onBeforeActiveMeshesEvaluationObservable
onAfterActiveMeshesEvaluationObservable
onBeforeParticlesRenderingObservable
onAfterParticlesRenderingObservable
onBeforeRenderTargetsRenderObservable
onAfterRenderTargetsRenderObservable
onBeforeDrawPhaseObservable
onAfterDrawPhaseObservable
onAfterCameraRenderObservable
			onAfterRenderObservable


onReady, onDataLoaded, onDispose,

*/