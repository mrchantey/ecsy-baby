import { MeshBuilder } from "babylonjs/Meshes/meshBuilder";
import { coreModule, SceneComp, TransformNodeComp } from "core";
import { ExtraSystem, ExtraWorld, registerModules } from "ecsy-extra";
import { MouseFollow, MouseFollowSystem } from "interaction";

// export class MouseFollowSpawn extends ExtraSystem {
//     start() {
//         const scene = this.getSingletonComponent(SceneComp)!.value
//         const box = MeshBuilder.CreateBox("box", {}, scene)
//         this.world
//             .createEntity("follower")
//             .addComponent(TransformNodeComp, { value: box })
//     }
// }

console.log('hello worlds!');

// const world = new ExtraWorld()
// registerModules(world, [coreModule])
// world.registerComponent(MouseFollow)
//     .registerSystem(MouseFollowSystem)



