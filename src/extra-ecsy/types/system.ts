import { Attributes, Component, ComponentConstructor, System } from "ecsy";
import { ExtraWorld, ExtraEntity } from "..";


export abstract class ExtraSystem extends System<ExtraEntity>  {
	world: ExtraWorld

	constructor(world: ExtraWorld, attributes?: Attributes) {
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
	beforeExecute(): void { }
	afterExecute(): void { }
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