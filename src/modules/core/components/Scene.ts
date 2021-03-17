import { Scene as BabylonScene } from 'babylonjs';
import { Component, ComponentSchema, Types } from 'ecsy';



class Scene extends Component<Scene> {
	scene: BabylonScene

	static schema: ComponentSchema = {
		scene: { type: Types.Ref }
	}
}
export {
	Scene,
	Scene as SceneComp
}