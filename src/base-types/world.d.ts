import { World, WorldOptions } from "ecsy";
import { BabyEntity } from "./entity";
export declare class BabyWorld extends World<BabyEntity> {
    entity: BabyEntity;
    constructor(options: WorldOptions);
}
