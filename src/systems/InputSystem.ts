import { WindowEvents, Mouse, Keyboard, CanvasEvents } from '../Components';
import { BabySystem } from "../types/system";


export class InputSystem extends BabySystem {

	execute() {
		// const Keyboard = this.world.entity.getMutableComponent(Keyboard)
		const windowEvents = this.world.entity.getComponent(WindowEvents)!.events
		const canvasEvents = this.world.entity.getComponent(CanvasEvents)!.events

		// console.dir(windowEvents);
		// console.dir(windowEvents);
		if (canvasEvents.mousemove)
			this.handleMouseMove(canvasEvents.mousemove)
		if (canvasEvents.wheel)
			this.handleMouseWheel(canvasEvents.wheel)
		if (canvasEvents.mousedown)
			this.handleMouseDown(canvasEvents.mousedown)
		if (canvasEvents.mouseup)
			this.handleMouseUp(canvasEvents.mouseup)
		if (windowEvents.keydown)
			this.handleKeyDown(windowEvents.keydown)
		if (windowEvents.keyup)
			this.handleKeyUp(windowEvents.keyup)


	}

	handleMouseMove(event: MouseEvent) {
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
		const rect = (event.target as HTMLElement).getBoundingClientRect()
		const x = event.clientX - Math.round(rect.left);
		const y = event.clientY - Math.round(rect.top);
		mouseComp.xnorm = x / Math.round(rect.width)
		mouseComp.ynorm = 1 - (y / Math.round(rect.height))
		mouseComp.xsign = mouseComp.xnorm * 2 - 1
		mouseComp.ysign = mouseComp.ynorm * 2 - 1
	}

	handleMouseWheel(event: WheelEvent) {
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
		mouseComp.xWheelSign = Math.sign(event.deltaX)
		mouseComp.yWheelSign = Math.sign(event.deltaY)
	}

	handleMouseDown(event: MouseEvent) {
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
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

	postExecute() {
		const mouseComp = this.world.entity.getMutableComponent(Mouse)!
		mouseComp.leftButtonDown = false
		mouseComp.leftButtonUp = false
		mouseComp.xWheelSign = 0
		mouseComp.yWheelSign = 0

		const keyboard = this.world.entity.getMutableComponent(Keyboard)!
		Object.keys(keyboard.keysDown).forEach(key => keyboard.keysDown[key] = false)
		Object.keys(keyboard.keysUp).forEach(key => keyboard.keysUp[key] = false)
		// Keyboard.keysDown = {}
		// Keyboard.keysUp = {}
		// deleteUndefined(Keyboard.keysPressed)
	}
}
// function deleteUndefined(obj) { Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]) }