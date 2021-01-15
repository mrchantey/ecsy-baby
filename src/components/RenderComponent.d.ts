import { Scene, Camera, Engine } from "babylonjs";
import { Component } from "ecsy";
export declare class RenderComponent extends Component<any> {
    engine?: Engine;
    scene?: Scene;
    camera?: Camera;
}
