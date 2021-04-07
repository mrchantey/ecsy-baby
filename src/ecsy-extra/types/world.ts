import { World, WorldOptions } from "ecsy";
import { ExtraEntity } from "./entity";
import { ExtraSystem } from "./system";


const isFunction = (f: any) => typeof f === 'function'

export class ExtraWorld extends World<ExtraEntity> {
	entity: ExtraEntity

	//HOOKS FOR TESTING ONLY
	_start: () => any = () => { }
	_beforeExecute: () => any = () => { }
	_execute: (delta?: number, time?: number) => any = () => { }
	_afterExecute: () => any = () => { }
	_dispose: () => any = () => { }

	systemsStart: ExtraSystem[]
	// systemsBeforeExecute: ExtraSystem[]
	// systemsAfterExecute: ExtraSystem[]
	systemsDispose: ExtraSystem[]
	systemsStop: ExtraSystem[]

	constructor({ entityClass = ExtraEntity, ...options }: WorldOptions = {}) {
		super({ entityClass, ...options })
		this.entity = this.createEntity("singleton")
	}



	//the world does not automatically run execute, this should be handled by some system in a start function
	start() {
		//they arent nessecarily extrasystems
		const systems = this.getSystems() as ExtraSystem[]
		this.systemsStart = systems.filter(s => isFunction(s.start))
		// this.systemsBeforeExecute = systems.filter(s => isFunction(s.beforeExecute))
		// this.systemsAfterExecute = systems.filter(s => isFunction(s.afterExecute))
		this.systemsDispose = systems.filter(s => isFunction(s.dispose))
		// this.systemsStop = systems.filter(s => isFunction(s.stop))

		this.systemsStart.forEach(s => s.start())
		this._start()

	}

	// stop() {
	// 	this.systemsStop.forEach(s => s.stop())
	// }

	//this is the only one who actually handles system callbacks for us
	execute(delta?: number, time?: number) {
		// this.beforeExecute()
		super.execute(delta, time)
		this._execute(delta, time)
		// this.afterExecute()
	}

	// beforeExecute() {
	// 	this.systemsBeforeExecute.forEach(s => s.beforeExecute())
	// 	this._beforeExecute()
	// }

	// afterExecute() {
	// 	this.systemsAfterExecute.forEach(s => s.afterExecute())
	// 	this._afterExecute()
	// }
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