// import { Canvas, Render, DomEvent } from '../Components';
// import { ExtraSystem } from "../base-types/system";
// import { Lifecycle } from "../components/Lifecycle";
// import { Scene } from "../components/Scene";
// import { BabyEvent } from '../utility/BabyEvent';


// function createWindowEvent<K extends keyof WindowEventMap>(el: Window, name: K, onDispose: BabyEvent) {
// 	const event = new BabyEvent<WindowEventMap[K]>()
// 	el.addEventListener(name, event.invoke)
// 	onDispose.addListener(() => el.removeEventListener(name, event.invoke))
// 	return event
// }
// function createHTMLEvent<K extends keyof HTMLElementEventMap>(el: HTMLElement, name: K, onDispose: BabyEvent) {
// 	const event = new BabyEvent<HTMLElementEventMap[K]>()
// 	el.addEventListener(name, event.invoke)
// 	onDispose.addListener(() => el.removeEventListener(name, event.invoke))
// 	// const handler = (e:HTMLElementEventMap[K])=>event.invoke(e)
// 	// el.addEventListener(name, event.invoke)
// 	// onDispose.addListener(() => el.removeEventListener(name, handler))
// 	return event
// }

// export class DomEventSystem extends ExtraSystem {

// 	init() {
// 		const onDispose = this.world.entity.getComponent(Lifecycle)!.onDispose
// 		const resize = createWindowEvent(window, "resize", onDispose)
// 		const keyDown = createWindowEvent(window, "keydown", onDispose)
// 		const keyUp = createWindowEvent(window, "keyup", onDispose)


// 		const canvas = this.world.entity.getComponent(Canvas)!.canvas
// 		const mouseMoveCanvas = createHTMLEvent(canvas, "mousemove", onDispose)
// 		const mouseDownCanvas = createHTMLEvent(canvas, "mousedown", onDispose)
// 		const mouseUpCanvas = createHTMLEvent(canvas, "mouseup", onDispose)
// 		const mouseWheelCanvas = createHTMLEvent(canvas, "wheel", onDispose)

// 		this.world.entity.addComponent(DomEvent, {
// 			resize,

// 			keyDown,
// 			keyUp,

// 			mouseMoveCanvas,
// 			mouseDownCanvas,
// 			mouseUpCanvas,
// 			mouseWheelCanvas,
// 		})
// 	}

// }