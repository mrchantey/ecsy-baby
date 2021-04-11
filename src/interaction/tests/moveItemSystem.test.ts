import { AbstractMesh, Ray, Vector3 } from "babylonjs"
import { AdvancedPlane, createTestScene, TransformNodeComp, Vector3Ext } from "core"
import { ExtraWorld } from "ecsy-extra"
import { Interactable, InteractionEvent, Interactor, MoveItemEvent, MoveItemTool, SelectEvent } from "interaction/components"
import { MoveItemSystem } from "interaction/systems"



describe("move item system", () => {
    const scene = createTestScene()


    const world = new ExtraWorld()
        .registerComponent(TransformNodeComp)
        .registerComponent(Interactor)
        .registerComponent(InteractionEvent)
        .registerComponent(SelectEvent)
        .registerComponent(MoveItemTool)
        .registerComponent(MoveItemEvent)
        .registerComponent(Interactable)
        .registerSystem(MoveItemSystem)



    const interactableMesh = new AbstractMesh("")
    const interactable = world
        .createEntity("interactable")
        .addComponent(TransformNodeComp, { value: interactableMesh })


    const interactor = world.createEntity("interactor")
        .addComponent(TransformNodeComp, { value: new AbstractMesh("") })
        .addComponent(Interactor)
        .addComponent(InteractionEvent, { interactable })
        .addComponent(SelectEvent)
        .addComponent(MoveItemTool, { plane: new AdvancedPlane(Vector3.Zero(), Vector3.Forward()) })


    beforeAll(() => {

    })

    it("adds event", () => {
        expect(Vector3Ext.isEqual(interactableMesh.position, Vector3.Zero())).toBeTruthy()
        expect(interactor.hasComponent(MoveItemEvent)).toBeFalsy()

        MoveItemSystem._screenRay = () => new Ray(Vector3.Backward(), Vector3.Forward())
        world.execute()
        expect(interactor.hasComponent(MoveItemEvent)).toBeTruthy()
        expect(Vector3Ext.isEqual(interactableMesh.position, Vector3.Zero())).toBeTruthy()
    })

    it("moves object", () => {
        MoveItemSystem._screenRay = () => new Ray(Vector3.Backward(), Vector3.Forward().addInPlace(Vector3.Right()).normalize())
        world.execute()
        expect(Vector3Ext.isEqual(interactableMesh.position, Vector3.Zero())).toBeFalsy()
    })

    it("removes event", () => {
        interactor.removeComponent(InteractionEvent)
        world.execute()
        expect(interactor.hasComponent(MoveItemEvent)).toBeFalsy()
    })
})