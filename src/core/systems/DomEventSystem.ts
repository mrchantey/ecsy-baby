import { Not, SystemQueries } from 'ecsy';
import { Action, ExtraSystem } from '../../extra-ecsy/index';
import { Canvas, CanvasEvents, WindowEvents } from '../components';

function registerWindowEvent<K extends keyof WindowEventMap>(el: Window, name: K, windowEventsBuffer: WindowEvents, disposeActions: Action[]) {

	const func = (event: WindowEventMap[K]) => {
		windowEventsBuffer.events[name] = event;
	}
	el.addEventListener(name, func)
	disposeActions.push(() => {
		el.removeEventListener(name, func)
		// console.dir('disposed');
	})
}
function registerHtmlEvent<K extends keyof HTMLElementEventMap>(el: HTMLElement, name: K, htmlEventsBuffer: CanvasEvents, disposeActions: Action[]) {
	const func = (event: HTMLElementEventMap[K]) => htmlEventsBuffer.events[name] = event
	el.addEventListener(name, func)
	disposeActions.push(() => el.removeEventListener(name, func))
}

export class DomEventSystem extends ExtraSystem {



	//TODO ACTUALLY DISPOSE ON STOP
	disposeActions: Action[] = []

	execute() {
		// console.log('pow');
		this.queries.uninitialized.results.forEach(entity => {

			const canvas = entity.getComponent(Canvas)!.value
			entity
				.addComponent(WindowEvents)
				.addComponent(CanvasEvents)
			const canvasEvents = entity.getComponent(CanvasEvents)!
			const windowEvents = entity.getComponent(WindowEvents)!
			const registeredWindowEvents: Array<keyof WindowEventMap> = ["resize", "keydown", "keyup"]
			const registeredCanvasEvents: Array<keyof HTMLElementEventMap> = ["pointermove", "pointerdown", "pointerup", "wheel", "mouseover", "mouseout"]

			// window.addEventListener("mousedown", (ev) => console.log('banana'))

			registeredWindowEvents.forEach(key => registerWindowEvent(window, key, windowEvents, this.disposeActions))
			registeredCanvasEvents.forEach(key => registerHtmlEvent(canvas, key, canvasEvents, this.disposeActions))
		})
	}

	afterExecute() {
		this.queries.initialized.results.forEach(entity => {
			const windowEvents = this.world.entity.getMutableComponent(WindowEvents)!
			const canvasEvents = this.world.entity.getMutableComponent(CanvasEvents)!
			windowEvents.events = {}
			canvasEvents.events = {}
		})
	}

	dispose() {
		this.disposeActions.forEach(a => a())
	}



	static queries: SystemQueries = {
		uninitialized: {
			components: [
				// Canvas,
				WindowEvents
				// Not(WindowEvents), Not(CanvasEvents)
			]
		},
		// initialized: {
		// 	components: [
		// 		// Canvas,
		// 		// WindowEvents,
		// 		// CanvasEvents
		// 	]
		// }
	}

}
