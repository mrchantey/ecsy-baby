import { BabySystem } from "../base-types/system";
import { SceneComponent } from "../components/SceneComponent";
export declare class RenderSystem extends BabySystem {
    needsResize: boolean;
    onResize(): void;
    init(): void;
    dispose(): void;
    execute(): void;
    static queries: {
        scenes: {
            components: (typeof SceneComponent)[];
        };
    };
}
