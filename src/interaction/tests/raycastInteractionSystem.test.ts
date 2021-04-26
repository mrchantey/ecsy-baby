import { AbstractMesh, MeshBuilder, TransformNode } from "babylonjs"
import { createTestScene, Mouse, SceneComp, TransformNodeComp } from "core"
import { ExtraEntity, ExtraWorld } from "ecsyExtra"
import {
    Interactable,
    Interactor,
    RaycastInteractionEvent,
    SelectEvent,
    InteractionEvent,
    RaycastInteractionSystem,
} from "interaction"






describe("raycast interaction system", () => {
    let world: ExtraWorld
    let interactor: ExtraEntity
    let interactable1: ExtraEntity
    let interactable2: ExtraEntity

    const scene = createTestScene()
    // const interactorMesh = new AbstractMesh("interactor", scene)
    const interactable1Mesh = new AbstractMesh("interactable1", scene)
    const interactable2Mesh = new AbstractMesh("interactable2", scene)

    let mockRaycast1 = jest.fn(() => ({ pickedMesh: interactable1Mesh }))
    let mockRaycast2 = jest.fn(() => ({ pickedMesh: interactable2Mesh }))
    let mockRaycastMiss = jest.fn(() => ({ pickedMesh: undefined }))

    beforeAll(() => {
        world = new ExtraWorld()
            .registerComponent(TransformNodeComp)
            .registerComponent(SceneComp)
            .registerComponent(Interactor)
            .registerComponent(Interactable)
            .registerComponent(SelectEvent)
            .registerComponent(InteractionEvent)
            .registerComponent(RaycastInteractionEvent)
            .registerSystem(RaycastInteractionSystem)

        world.entity.addComponent(SceneComp, { value: scene })
        world.start()
        interactor = world.createEntity("interactor")
            .addComponent(TransformNodeComp, { value: new TransformNode("interactor") })
            .addComponent(Interactor)

        interactable1 = world.createEntity("interactable1")
            .addComponent(TransformNodeComp, { value: interactable1Mesh })
            .addComponent(Interactable)
        interactable2 = world.createEntity("interactable2")
            .addComponent(TransformNodeComp, { value: interactable2Mesh })
            .addComponent(Interactable)
    })
    it("passes", () => { })
    it("creates interaction event", () => {
        scene.pickWithRay = mockRaycast1 as any
        world.execute()
        expect(mockRaycast1).toHaveBeenCalled()
        expect(interactor.getComponent(InteractionEvent)?.interactable)
            .toBe(interactable1)
    })

    it("removes interaction event", () => {
        scene.pickWithRay = mockRaycastMiss as any
        world.execute()
        expect(mockRaycastMiss).toHaveBeenCalled()
        expect(interactor.hasComponent(RaycastInteractionEvent))
            .toBe(false)
    })

    it("replaces interaction event", () => {
        scene.pickWithRay = mockRaycast1 as any
        world.execute()
        expect(mockRaycast1).toHaveBeenCalled()
        expect(interactor.getComponent(InteractionEvent)?.interactable)
            .toBe(interactable1)

        scene.pickWithRay = mockRaycast2 as any
        world.execute()
        expect(mockRaycast2).toHaveBeenCalled()
        expect(interactor.getComponent(InteractionEvent)?.interactable)
            .toBe(interactable2)
    })
})