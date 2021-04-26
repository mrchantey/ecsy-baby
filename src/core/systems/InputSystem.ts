import { SystemQueries } from "ecsy"
import { ExtraSystem } from "../../ecsyExtra/index"
import { CanvasEvents, Keyboard, Mouse, WindowEvents } from "../components"


export class InputSystem extends ExtraSystem {

	start() {
		this
			.addSingletonComponent(Mouse)
			.addSingletonComponent(Keyboard)
	}



	execute() {

		this.cleanupMouse()
		this.cleanupKeyboard()

		// const Keyboard = this.getMutableSingletonComponent(Keyboard)
		const windowEvents = this.getSingletonComponent(WindowEvents)!.events
		const canvasEvents = this.getSingletonComponent(CanvasEvents)!.events


		//ONLY EVENTS REGISTERED ON DOMEVENTSYSTEM WILL BE TRIGGERED
		if (canvasEvents.pointermove)
			this.handleMouseMove(canvasEvents.pointermove)
		if (canvasEvents.wheel)
			this.handleMouseWheel(canvasEvents.wheel)
		if (canvasEvents.pointerdown)
			this.handleMouseDown(canvasEvents.pointerdown)
		if (canvasEvents.pointerup)
			this.handleMouseUp(canvasEvents.pointerup)
		if (canvasEvents.mouseover)
			this.handleMouseOver(canvasEvents.mouseover)
		if (canvasEvents.mouseout)
			this.handleMouseOut(canvasEvents.mouseout)
		if (windowEvents.keydown)
			this.handleKeyDown(windowEvents.keydown)
		if (windowEvents.keyup)
			this.handleKeyUp(windowEvents.keyup)


	}

	cleanupMouse() {
		const mouse = this.getMutableSingletonComponent(Mouse)!
		mouse.mouseOver = false
		mouse.mouseOut = false
		mouse.leftButtonDown = false
		mouse.leftButtonUp = false

		mouse.xWheelSign = 0
		// mouse.xnorm = 0
		// mouse.xsign = 0
		mouse.xdelta = 0

		mouse.yWheelSign = 0
		// mouse.ynorm = 0
		// mouse.ysign = 0
		mouse.ydelta = 0
	}

	cleanupKeyboard() {
		const keyboard = this.getMutableSingletonComponent(Keyboard)!
		Object.keys(keyboard.keysDown).forEach(key => keyboard.keysDown[key] = false)
		Object.keys(keyboard.keysUp).forEach(key => keyboard.keysUp[key] = false)
	}

	getXYNorm(event: MouseEvent) {
		const rect = (event.target as HTMLElement).getBoundingClientRect()
		const elx = event.clientX - Math.round(rect.left);
		const ely = event.clientY - Math.round(rect.top);
		return {
			x: elx / Math.round(rect.width),
			y: 1 - (ely / Math.round(rect.height))
		}
	}


	handleMouseMove(event: MouseEvent) {
		const mouseComp = this.getMutableSingletonComponent(Mouse)!
		const val = this.getXYNorm(event)
		mouseComp.xnorm = val.x
		mouseComp.ynorm = val.y

		const newx = mouseComp.xnorm * 2 - 1
		const newy = mouseComp.ynorm * 2 - 1
		mouseComp.xdelta = newx - mouseComp.xsign
		mouseComp.ydelta = newy - mouseComp.ysign
		mouseComp.xsign = newx
		mouseComp.ysign = newy
		if (mouseComp.leftButtonDown) {
			// console.log('setting');
			mouseComp.xDownNorm = mouseComp.xnorm
			mouseComp.yDownNorm = mouseComp.ynorm
		}
	}

	handleMouseOver(event: MouseEvent) {
		const mouseComp = this.getMutableSingletonComponent(Mouse)!
		mouseComp.mouseOver = true
		mouseComp.mouseStay = true
	}
	handleMouseOut(event: MouseEvent) {
		const mouseComp = this.getMutableSingletonComponent(Mouse)!
		mouseComp.mouseStay = false
		mouseComp.mouseOut = true

		this.handleMouseUp(event)
	}

	handleMouseWheel(event: WheelEvent) {
		const mouseComp = this.getMutableSingletonComponent(Mouse)!
		mouseComp.xWheelSign = Math.sign(event.deltaX)
		mouseComp.yWheelSign = Math.sign(event.deltaY)
	}

	handleMouseDown(event: MouseEvent) {
		const mouseComp = this.getMutableSingletonComponent(Mouse)!
		const val = this.getXYNorm(event)
		mouseComp.xDownNorm = val.x
		mouseComp.yDownNorm = val.y
		mouseComp.leftButtonDown = true
		mouseComp.leftButtonHeld = true
	}

	handleMouseUp(event: MouseEvent) {
		const mouseComp = this.getMutableSingletonComponent(Mouse)!
		mouseComp.leftButtonUp = true
		mouseComp.leftButtonHeld = false
	}

	handleKeyDown(event: KeyboardEvent) {
		const keyboard = this.getMutableSingletonComponent(Keyboard)!
		if (keyboard.keysPressed[event.key] === true) return
		keyboard.keysDown[event.key] = true
		keyboard.keysPressed[event.key] = true
	}
	handleKeyUp(event: KeyboardEvent) {
		const keyboard = this.getMutableSingletonComponent(Keyboard)!
		keyboard.keysUp[event.key] = true
		keyboard.keysPressed[event.key] = false
	}
}
// function deleteUndefined(obj) { Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]) }
