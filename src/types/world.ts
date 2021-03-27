import { World, WorldOptions } from "ecsy";
import { BabyEntity } from "./entity";
import { BabySystem } from "./system";


const isFunction = (f: any) => typeof f === 'function'

export class BabyWorld extends World<BabyEntity> {
	entity: BabyEntity

	onExecute: (delta: number, time: number) => any = () => { }
	systemsStart: BabySystem[]
	systemsBeforeRender: BabySystem[]
	systemsAfterRender: BabySystem[]
	systemsDispose: BabySystem[]
	systemsStop: BabySystem[]

	constructor({ entityClass = BabyEntity, ...options }: WorldOptions = {}) {
		super({ entityClass, ...options })
		this.entity = this.createEntity("singleton")
	}

	start() {
		//they arent nessecarily babysystems
		const systems = this.getSystems() as BabySystem[]
		this.systemsStart = systems.filter(s => isFunction(s.start))
		this.systemsBeforeRender = systems.filter(s => isFunction(s.beforeRender))
		this.systemsAfterRender = systems.filter(s => isFunction(s.afterRender))
		this.systemsDispose = systems.filter(s => isFunction(s.dispose))
		this.systemsStop = systems.filter(s => isFunction(s.stop))

		this.systemsStart.forEach(s => s.start())
	}

	stop() {
		this.systemsStop.forEach(s => s.stop())
	}

	execute(delta: number = 0, time: number = 0) {
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