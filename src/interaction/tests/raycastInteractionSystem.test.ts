import { AbstractMesh, MeshBuilder } from "babylonjs"
import { Scene } from "babylonjs/scene"
import { createTestScene, Mouse, TransformNodeComp } from "core"
import { ExtraEntity, ExtraWorld } from "ecsy-extra"
import { Interactable, Interactor } from "interaction/components"
import { InteractionEvent } from "interaction/components/events/InteractionEvent"
import { RaycastInteractionSystem } from "interaction/systems/RaycastInteractionSystem"







describe("raycast interaction system", () => {
    let world: ExtraWorld
    let interactor: ExtraEntity
    let interactable1: ExtraEntity
    let interactable2: ExtraEntity

    const scene = createTestScene()
    // const interactorMesh = new AbstractMesh("interactor", scene)
    const interactable1Mesh = new AbstractMesh("interactable1", scene)
    const interactable2Mesh = new AbstractMesh("interactable2", scene)

    let mockRaycastMouse1 = jest.fn(() => ({ pickedMesh: interactable1Mesh }))
    let mockRaycastMouse2 = jest.fn(() => ({ pickedMesh: interactable2Mesh }))
    let mockRaycastMouseMiss = jest.fn(() => ({ pickedMesh: undefined }))

    beforeAll(() => {
        world = new ExtraWorld()
            .registerComponent(TransformNodeComp)
            .registerComponent(Interactor)
            .registerComponent(Interactable)
            .registerComponent(InteractionEvent)
            .registerSystem(RaycastInteractionSystem)
        world.start()
        interactor = world.createEntity("interactor")
            .addComponent(TransformNodeComp)
            .addComponent(Interactor)

        interactable1 = world.createEntity("interactable1")
            .addComponent(TransformNodeComp, { value: interactable1Mesh })
            .addComponent(Interactable)
        interactable2 = world.createEntity("interactable2")
            .addComponent(TransformNodeComp, { value: interactable2Mesh })
            .addComponent(Interactable)
    })

    it("creates interaction event", () => {
        RaycastInteractionSystem._raycastMouse = mockRaycastMouse1
        world.execute()
        expect(mockRaycastMouse1).toHaveBeenCalled()
        expect(interactor.getComponent(InteractionEvent)?.interactable)
            .toBe(interactable1)
    })

    it("removes interaction event", () => {
        RaycastInteractionSystem._raycastMouse = mockRaycastMouseMiss
        world.execute()
        expect(mockRaycastMouseMiss).toHaveBeenCalled()
        expect(interactor.hasComponent(InteractionEvent))
            .toBe(false)
    })

    it("replaces interaction event", () => {
        RaycastInteractionSystem._raycastMouse = mockRaycastMouse1
        world.execute()
        expect(mockRaycastMouse1).toHaveBeenCalled()
        expect(interactor.getComponent(InteractionEvent)?.interactable)
            .toBe(interactable1)

        RaycastInteractionSystem._raycastMouse = mockRaycastMouse2
        world.execute()
        expect(mockRaycastMouse2).toHaveBeenCalled()
        expect(interactor.getComponent(InteractionEvent)?.interactable)
            .toBe(interactable2)
    })
})