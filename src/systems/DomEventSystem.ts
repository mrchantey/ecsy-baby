import { Canvas, Render, CanvasEvents, WindowEvents } from '../Components';
import { BabySystem } from "../types/system";
import { Lifecycle } from "../components/Lifecycle";
import { Scene } from "../components/Scene";
import { BabyEvent } from '../utility/BabyEvent';
import { Action } from '../utility/interfaces';
import { iHtmlEvents, iWindowEvents } from '../types/domEvent';


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

export class DomEventSystem extends BabySystem {

	disposeActions: Action[] = []

	init() {
		// console.log('pow');


		const canvas = this.world.entity.getComponent(Canvas)!.canvas
		const canvasEvents = this.world.entity.getComponent(CanvasEvents)!
		const windowEvents = this.world.entity.getComponent(WindowEvents)!

		const registeredWindowEvents: Array<keyof WindowEventMap> = ["resize", "keydown", "keyup"]
		const registeredCanvasEvents: Array<keyof HTMLElementEventMap> = ["pointermove", "pointerdown", "pointerup", "wheel"]

		// window.addEventListener("mousedown", (ev) => console.log('banana'))

		registeredWindowEvents.forEach(key => registerWindowEvent(window, key, windowEvents, this.disposeActions))
		registeredCanvasEvents.forEach(key => registerHtmlEvent(canvas, key, canvasEvents, this.disposeActions))
	}


	execute() {


	}

	afterRender() {


		const windowEvents = this.world.entity.getMutableComponent(WindowEvents)!
		const canvasEvents = this.world.entity.getMutableComponent(CanvasEvents)!

		windowEvents.events = {}
		canvasEvents.events = {}
	}

	dispose() {
		this.disposeActions.forEach(a => a())
	}


}