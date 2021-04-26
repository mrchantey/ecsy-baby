import { Attributes, Component, ComponentConstructor, Entity, System, _Entity } from "ecsy";
import { ExtraEntity } from "ecsyExtra/types/entity";
import { ExtraWorld } from "ecsyExtra/types/world";
import { createQueryTuplesFromObject, QuerySet, QueryTupleSet } from "ecsyExtra/utility/QueryExt";


export abstract class ExtraSystem extends System<ExtraEntity>  {
	world: ExtraWorld

	constructor(world: ExtraWorld, attributes?: Attributes) {
		super(world, attributes)
		this.world = world //a little hacky
	}

	//query tuples
	queryTuples: QueryTupleSet<ExtraEntity>

	init() {
		const systemQueryTuples = (this as any).constructor.queryTuples as QuerySet
		if (systemQueryTuples)
			this.queryTuples = createQueryTuplesFromObject(this, systemQueryTuples)
	}
	static queryTuples: QuerySet

	//singletons -- to deprecate
	getMutableSingletonComponent<C extends Component<any>>(component: ComponentConstructor<C>) {
		return this.world.entity.getMutableComponent(component)!
	}
	getSingletonComponent<C extends Component<any>>(component: ComponentConstructor<C>) {
		return this.world.entity.getComponent(component)!
	}
	removeSingletonComponent<C extends Component<any>>(component: ComponentConstructor<C>) {
		return this.world.entity.removeComponent(component)
	}
	addSingletonComponent<C extends Component<any>>(component: ComponentConstructor<C>, values?: Partial<Omit<C, keyof Component<any>>>) {
		this.world.entity.addComponent(component, values)
		return this
	}
	setSingletonComponent<C extends Component<any>>(component: ComponentConstructor<C>, values?: Partial<Omit<C, keyof Component<any>>>) {
		this.world.entity.setComponent(component, values)
		return this
	}
	// hasSingletonComponent




	start() { }
	//dont implement execute, if system has no execute function it will simply be ignored.
	//systems are allowed to not have an execute function
	// execute(delta: number, time: number): void { }
	// execute?: (delta: number, time: number) => void
	// beforeExecute(): void { }
	// afterExecute(): void { }
	dispose(): void { }
}
