import { Attributes, System } from "ecsy";
import { BabyEntity } from "./entity";
import { BabyWorld } from "./world";


export abstract class BabySystem extends System<BabyEntity>  {
	world: BabyWorld

	constructor(world: BabyWorld, attributes?: Attributes) {
		super(world, attributes)
		this.world = world //a little hacky
	}

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