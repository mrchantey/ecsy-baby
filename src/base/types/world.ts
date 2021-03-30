import { World, WorldOptions } from "ecsy";
import { BabyEntity } from "./entity";
import { BabySystem } from "./system";


const isFunction = (f: any) => typeof f === 'function'

export class BabyWorld extends World<BabyEntity> {
	entity: BabyEntity

	_start: () => any = () => { }
	_beforeExecute: () => any = () => { }
	_execute: (delta: number, time: number) => any = () => { }
	_afterExecute: () => any = () => { }
	_dispose: () => any = () => { }
	systemsStart: BabySystem[]
	systemsBeforeExecute: BabySystem[]
	systemsAfterExecute: BabySystem[]
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
		this.systemsBeforeExecute = systems.filter(s => isFunction(s.beforeExecute))
		this.systemsAfterExecute = systems.filter(s => isFunction(s.afterExecute))
		this.systemsDispose = systems.filter(s => isFunction(s.dispose))
		this.systemsStop = systems.filter(s => isFunction(s.stop))

		this.systemsStart.forEach(s => s.start())
		this._start()
	}

	stop() {
		this.systemsStop.forEach(s => s.stop())
	}

	execute(delta: number = 0, time: number = 0) {
		this.beforeExecute()
		super.execute(delta, time)
		this._execute(delta, time)
		this.afterExecute()
	}

	beforeExecute() {
		this.systemsBeforeExecute.forEach(s => s.beforeExecute())
		this._beforeExecute()
	}

	afterExecute() {
		this.systemsAfterExecute.forEach(s => s.afterExecute())
		this._afterExecute()
	}
	dispose() {
		this.systemsDispose.forEach(s => s.dispose())
		this._dispose()
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