import { BabySystem } from "../../base/index"
import { CanvasEvents, Keyboard, Mouse, WindowEvents } from "../components"


export class InputSystem extends BabySystem {

	execute() {

		// const Keyboard = this.world.entity.getMutableComponent(Keyboard)
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
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
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
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
		mouseComp.mouseOver = true
		mouseComp.mouseStay = true
	}
	handleMouseOut(event: MouseEvent) {
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
		mouseComp.mouseStay = false
		mouseComp.mouseOut = true

		this.handleMouseUp(event)
	}

	handleMouseWheel(event: WheelEvent) {
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
		mouseComp.xWheelSign = Math.sign(event.deltaX)
		mouseComp.yWheelSign = Math.sign(event.deltaY)
	}

	handleMouseDown(event: MouseEvent) {
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
		const val = this.getXYNorm(event)
		mouseComp.xDownNorm = val.x
		mouseComp.yDownNorm = val.y
		mouseComp.leftButtonDown = true
		mouseComp.leftButtonHeld = true
	}

	handleMouseUp(event: MouseEvent) {
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
		mouseComp.leftButtonUp = true
		mouseComp.leftButtonHeld = false
	}

	handleKeyDown(event: KeyboardEvent) {
		const keyboard = this.world.entity.getMutableComponent(Keyboard)!
		if (keyboard.keysPressed[event.key] === true) return
		keyboard.keysDown[event.key] = true
		keyboard.keysPressed[event.key] = true
	}
	handleKeyUp(event: KeyboardEvent) {
		const keyboard = this.world.entity.getMutableComponent(Keyboard)!
		keyboard.keysUp[event.key] = true
		keyboard.keysPressed[event.key] = false
	}

	afterExecute() {
		// console.log('cachow');

		//this should be a different system now we have order sorted
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
		mouseComp.mouseOver = false
		mouseComp.mouseOut = false
		mouseComp.leftButtonDown = false
		mouseComp.leftButtonUp = false

		mouseComp.xWheelSign = 0
		// mouseComp.xnorm = 0
		// mouseComp.xsign = 0
		mouseComp.xdelta = 0

		mouseComp.yWheelSign = 0
		// mouseComp.ynorm = 0
		// mouseComp.ysign = 0
		mouseComp.ydelta = 0


		const keyboard = this.world.entity.getMutableComponent(Keyboard)!
		Object.keys(keyboard.keysDown).forEach(key => keyboard.keysDown[key] = false)
		Object.keys(keyboard.keysUp).forEach(key => keyboard.keysUp[key] = false)
		// Keyboard.keysDown = {}
		// Keyboard.keysUp = {}
		// deleteUndefined(Keyboard.keysPressed)
	}
}
// function deleteUndefined(obj) { Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]) }