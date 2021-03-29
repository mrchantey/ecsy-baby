import { Attributes, Component, ComponentConstructor, System } from "ecsy";
import { BabyWorld, BabyEntity } from "../";


export abstract class BabySystem extends System<BabyEntity>  {
	world: BabyWorld

	constructor(world: BabyWorld, attributes?: Attributes) {
		super(world, attributes)
		this.world = world //a little hacky
	}

	getMutableSingletonComponent<C extends Component<any>>(component: ComponentConstructor<C>) {
		return this.world.entity.getMutableComponent(component)!
	}
	getSingletonComponent<C extends Component<any>>(component: ComponentConstructor<C>) {
		return this.world.entity.getComponent(component)!
	}
	addSingletonComponent<C extends Component<any>>(component: ComponentConstructor<C>, values?: Partial<Omit<C, keyof Component<any>>>) {
		return this.world.entity.addComponent(component, values)!
	}
	setSingletonComponent<C extends Component<any>>(component: ComponentConstructor<C>, values?: Partial<Omit<C, keyof Component<any>>>) {
		return this.world.entity.setComponent(component, values)!
	}
	// hasSingletonComponent

	start() { }
	execute(delta: number, time: number): void { }
	beforeRender(): void { }
	afterRender(): void { }
	dispose(): void { }
}


// export abstract class ECSYThreeSystem extends System {
// 	constructor(world: ECSYThreeWorld, attributes?: Attributes);

// 	queries: {
// 	  [queryName: string]: {
// 		results: ECSYThreeEntity[],
// 		added?: ECSYThreeEntity[],
// 		removed?: ECSYThreeEntity[],
// 		changed?: ECSYThreeEntity[],
// 	  }
// 	}

// 	world: ECSYThreeWorld;
//   }