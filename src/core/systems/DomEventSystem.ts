import { Action, ExtraSystem } from '../../ecsy-extra/index';
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

	start() {
		const canvas = this.getSingletonComponent(Canvas)!.value
		this.addSingletonComponent(WindowEvents)
			.addSingletonComponent(CanvasEvents)
		const canvasEvents = this.getSingletonComponent(CanvasEvents)!
		const windowEvents = this.getSingletonComponent(WindowEvents)!
		const registeredWindowEvents: Array<keyof WindowEventMap> = ["resize", "keydown", "keyup"]
		const registeredCanvasEvents: Array<keyof HTMLElementEventMap> = ["pointermove", "pointerdown", "pointerup", "wheel", "mouseover", "mouseout"]

		// window.addEventListener("mousedown", (ev) => console.log('banana'))

		registeredWindowEvents.forEach(key => registerWindowEvent(window, key, windowEvents, this.disposeActions))
		registeredCanvasEvents.forEach(key => registerHtmlEvent(canvas, key, canvasEvents, this.disposeActions))
	}


	execute() {
		this.cleanup()
	}
	cleanup() {
		const windowEvents = this.getMutableSingletonComponent(WindowEvents)!
		const canvasEvents = this.getMutableSingletonComponent(CanvasEvents)!
		windowEvents.events = {}
		canvasEvents.events = {}
	}

	dispose() {
		this.disposeActions.forEach(a => a())
	}
}
