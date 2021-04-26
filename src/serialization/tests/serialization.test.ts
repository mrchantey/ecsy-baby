import { World } from "ecsy"
import { SerializedData } from "serialization/components/SerializedData"
import { ToDeserialize } from "serialization/components/ToDeserialize"
import { ToSerialize } from "serialization/components/ToSerialize"
import { DeserializeSystem } from "serialization/systems/DeserializeSystem"
import { SerializeSystem } from "serialization/systems/SerializeSystem"
import { TestComp, TestCompIgnore, TestCompInclude } from "serialization/tests/TestComp"



describe("serialization", () => {
    let world: World
    const testVal = { val1: true, val2: "hello world" }
    const testValStr = JSON.stringify({ "TestComp": testVal })

    beforeEach(() => {
        world = new World()
            // world
            .registerComponent(ToSerialize)
            .registerComponent(ToDeserialize)
            .registerComponent(SerializedData)
            .registerComponent(TestComp)
            .registerComponent(TestCompIgnore)
            .registerComponent(TestCompInclude)
            .registerSystem(SerializeSystem)
            .registerSystem(DeserializeSystem)
    })

    it("serializes", () => {

        const entity = world.createEntity()
            .addComponent(TestComp, testVal)
            .addComponent(ToSerialize)

        world.execute()
        expect(entity.hasComponent(ToSerialize)).toBeFalsy()
        expect(entity.hasComponent(SerializedData)).toBeTruthy()
        expect(entity.getComponent(SerializedData)!.value).toBe(testValStr)
    })

    it("ignores false serialize", () => {

        const entity = world.createEntity()
            .addComponent(TestComp, testVal)
            .addComponent(TestCompIgnore, testVal)
            .addComponent(ToSerialize)

        world.execute()
        expect(entity.hasComponent(ToSerialize)).toBeFalsy()
        expect(entity.hasComponent(SerializedData)).toBeTruthy()
        expect(entity.getComponent(SerializedData)!.value).toBe(testValStr)
    })

    it("ignores no explicit serialize", () => {
        const entity = world.createEntity()
            .addComponent(TestComp, testVal)
            .addComponent(ToSerialize, { explicitInclude: true })

        world.execute()
        expect(entity.hasComponent(ToSerialize)).toBeFalsy()
        expect(entity.hasComponent(SerializedData)).toBeTruthy()
        expect(entity.getComponent(SerializedData)!.value).toBe("{}")
    })
    it("includes explicit serialize", () => {
        const entity = world.createEntity()
            .addComponent(TestCompInclude, testVal)
            .addComponent(ToSerialize, { explicitInclude: true })
        world.execute()
        expect(entity.hasComponent(ToSerialize)).toBeFalsy()
        expect(entity.hasComponent(SerializedData)).toBeTruthy()
        expect(entity.getComponent(SerializedData)!.value).not.toBe("{}")
    })

    it("deserializes", () => {

        const entity = world.createEntity()
            .addComponent(SerializedData, { value: testValStr })
            .addComponent(ToDeserialize)

        world.execute()

        expect(entity.hasComponent(ToDeserialize)).toBeFalsy()
        expect(entity.hasComponent(TestComp)).toBeTruthy()
        const comp = entity.getComponent(TestComp)!
        expect(comp.val1).toBe(testVal.val1)
        expect(comp.val2).toBe(testVal.val2)
    })
})