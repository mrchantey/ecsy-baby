import { World, WorldOptions } from "ecsy";
import { BabyEntity } from "./entity";
// import { Object3DComponent } from "./components/Object3DComponent.js";


export class BabyWorld extends World<BabyEntity> {
	entity: BabyEntity
	constructor(options: WorldOptions) {
		super(options)
		// super(
		// 	Object.assign({ entityClass: BabyWorld, }, options)
		// );
		this.entity = this.createEntity("singleton")
	}
}

