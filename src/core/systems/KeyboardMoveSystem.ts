import { Vector3 } from "babylonjs";
import { MatrixExt } from "core/utility";
import { SystemQueries } from "ecsy";
import { ExtraSystem, KeyValue } from "../../ecsy-extra/index";
// import { ExtraSystem, KeyValue, MatrixExt } from "../../..";
import { Keyboard, KeyboardMove, TransformNodeComp } from "../components";


export class KeyboardMoveSystem extends ExtraSystem {
	execute(delta: number) {
		this.queries.entities.results.forEach(entity => {
			const node = entity.getComponent(TransformNodeComp)!.value
			const keyboardMove = entity.getComponent(KeyboardMove)!
			const keyboard = this.getSingletonComponent(Keyboard)!

			const translateSpeed = delta * keyboardMove.translateSpeed
			const rotateSpeed = delta * keyboardMove.rotateSpeed

			const worldMatrix = node.computeWorldMatrix(true)
			const forward = MatrixExt.forward(worldMatrix)
			const right = MatrixExt.right(worldMatrix)
			const up = MatrixExt.up(worldMatrix)
			const newPos = Vector3.Zero()

			if (keyboard.keysPressed[KeyValue.KEY_W] || keyboard.keysPressed[KeyValue.ArrowUp])
				newPos.addInPlace(forward.scale(translateSpeed))
			if (keyboard.keysPressed[KeyValue.KEY_S] || keyboard.keysPressed[KeyValue.ArrowDown])
				newPos.addInPlace(forward.scale(-translateSpeed))

			if (keyboard.keysPressed[KeyValue.KEY_D] || keyboard.keysPressed[KeyValue.ArrowRight])
				newPos.addInPlace(right.scale(translateSpeed))
			if (keyboard.keysPressed[KeyValue.KEY_A] || keyboard.keysPressed[KeyValue.ArrowLeft])
				newPos.addInPlace(right.scale(-translateSpeed))

			if (keyboard.keysPressed[KeyValue.KEY_R])
				newPos.addInPlace(up.scale(translateSpeed))
			if (keyboard.keysPressed[KeyValue.KEY_F])
				newPos.addInPlace(up.scale(-translateSpeed))

			if (keyboard.keysPressed[KeyValue.KEY_Q] || keyboard.keysPressed[KeyValue.ArrowRight])
				node.rotation.y -= rotateSpeed
			if (keyboard.keysPressed[KeyValue.KEY_E] || keyboard.keysPressed[KeyValue.ArrowRight])
				node.rotation.y += rotateSpeed

			node.position.addInPlace(newPos)

		})
	}

	static queries: SystemQueries = {
		entities: {
			components: [
				TransformNodeComp,
				KeyboardMove
			]
		}
	}
}