import { BabySystem } from "../../../types/system";
import { CanvasEvents } from "../components/CanvasEvents";
import { Keyboard } from "../components/Keyboard";
import { Mouse } from "../components/Mouse";
import { WindowEvents } from "../components/WindowEvents";


export class InputSystem extends BabySystem {

	execute() {
		// const Keyboard = this.world.entity.getMutableComponent(Keyboard)
		const windowEvents = this.world.entity.getComponent(WindowEvents)!.events
		const canvasEvents = this.world.entity.getComponent(CanvasEvents)!.events

		// console.dir(windowEvents);
		// console.dir(windowEvents);
		if (canvasEvents.pointermove)
			this.handleMouseMove(canvasEvents.pointermove)
		if (canvasEvents.wheel)
			this.handleMouseWheel(canvasEvents.wheel)
		if (canvasEvents.pointerdown)
			this.handleMouseDown(canvasEvents.pointerdown)
		if (canvasEvents.pointerup)
			this.handleMouseUp(canvasEvents.pointerup)
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
		mouseComp.xsign = mouseComp.xnorm * 2 - 1
		mouseComp.ysign = mouseComp.ynorm * 2 - 1
		if (mouseComp.leftButtonDown) {
			console.log('setting');
			mouseComp.xDownNorm = mouseComp.xnorm
			mouseComp.yDownNorm = mouseComp.ynorm
		}
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

	afterRender() {
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