import { Scene } from "babylonjs";
import { World, WorldOptions } from "ecsy";
import { BabyEntity } from "./entity";
import { BabySystem } from "./system";
// import { Object3DComponent } from "./components/Object3DComponent.js";


export function createBabyWorld(options: WorldOptions) {
	const _options = {
		entityClass: BabyEntity
	}
	Object.assign(_options, options as any)
	return new BabyWorld(_options)
}



export class BabyWorld extends World<BabyEntity> {
	entity: BabyEntity

	onExecute: (delta: number, time: number) => any = () => { }
	systemsStart: BabySystem[]
	systemsBeforeRender: BabySystem[]
	systemsAfterRender: BabySystem[]
	systemsDispose: BabySystem[]

	constructor(options: WorldOptions) {
		super(options)
		this.entity = this.createEntity("singleton")
	}

	start() {
		const systems = this.getSystems() as BabySystem[]
		this.systemsStart = systems.filter(s => s.start !== undefined)
		this.systemsBeforeRender = systems.filter(s => s.beforeRender !== undefined)
		this.systemsAfterRender = systems.filter(s => s.afterRender !== undefined)
		this.systemsDispose = systems.filter(s => s.dispose !== undefined)

		// console.dir(this.systemsAfterRender.length);
		this.systemsStart.forEach(s => s.start())
	}

	execute(delta: number, time: number) {
		super.execute(delta, time)
		this.onExecute(delta, time)
	}

	beforeRender() {
		this.systemsBeforeRender.forEach(s => s.beforeRender())
	}


	afterRender() {
		this.systemsAfterRender.forEach(s => s.afterRender())
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