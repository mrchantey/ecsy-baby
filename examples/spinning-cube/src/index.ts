
import { HemisphericLight, MeshBuilder, Vector3 } from "babylonjs";
import { Component, ComponentSchema, System, SystemQueries, Types } from "ecsy";
import { BabySystem } from "../../../dist/base-types/system";
import { EulerRotation } from "../../../dist/components/EulerRotationComponent";
import { initialize } from "../../../dist/index"


class CubeSpinComponent extends Component<CubeSpinComponent>{
	speed: number
	static schema: ComponentSchema = {
		speed: { default: 1, type: Types.Number }
	}
}

class CubeSpinSystem extends System {
	execute(delta: number) {

		this.queries.entities.results.forEach(entity => {
			const cubeSpin = entity.getComponent(CubeSpinComponent)!
			const eulerRotation = entity.getComponent(EulerRotation)!
			eulerRotation.value.x += 0.5 * delta * cubeSpin.speed;
			eulerRotation.value.y += 0.1 * delta * cubeSpin.speed;
		})
	}
	static queries: SystemQueries = {
		entities: {
			components: [CubeSpinComponent, EulerRotation]
		}
	}
}



const { scene, world } = initialize()


world
	.registerComponent(CubeSpinComponent)
	.registerSystem(CubeSpinSystem)


const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)

const box = MeshBuilder.CreateBox("box", {}, scene)
world.createEntity("box")
	.addComponent(CubeSpinComponent, { speed: 3 })
	.addComponent(EulerRotation, { value: box.rotation })
