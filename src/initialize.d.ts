import { ArcRotateCamera, Camera, Engine, EngineOptions, Scene, SceneOptions } from "babylonjs";
import { WorldOptions } from "ecsy";
import { BabyWorld } from "./base-types/world";
export interface iInitializeOptions {
    antialias?: boolean;
    camera?: Camera;
    canvas?: HTMLCanvasElement;
    engineOptions?: EngineOptions;
    worldOptions?: WorldOptions;
    sceneOptions?: SceneOptions;
}
export declare function initialize({ canvas, antialias, engineOptions, worldOptions, sceneOptions }?: iInitializeOptions): {
    engine: Engine;
    canvas: HTMLCanvasElement;
    world: BabyWorld;
    scene: Scene;
    sceneEntity: import("./base-types/entity").BabyEntity;
    camera: ArcRotateCamera;
    cameraEntity: import("./base-types/entity").BabyEntity;
};
