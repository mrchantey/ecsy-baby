import { Attributes, System } from "ecsy";
import { BabyEntity } from "./entity";
import { BabyWorld } from "./world";
export declare abstract class BabySystem extends System<BabyEntity> {
    world: BabyWorld;
    constructor(world: BabyWorld, attributes?: Attributes);
}
