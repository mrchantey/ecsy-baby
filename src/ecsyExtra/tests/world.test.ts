import { ExtraEntity } from "../index"
import { ExtraWorld } from "../index"
import { wait } from "../utility/jsUtility"
import { TestSystem, TestValueComponent } from "./testTypes"

describe("world", () => {
    const world = new ExtraWorld()
    it("is a baby world", async () => {
        expect(world)
            .toBeInstanceOf(ExtraWorld)
    })
    it("creates the singleton entity", () => {
        const world = new ExtraWorld()
        expect(world.entity).toBeTruthy()
    })
    it("creates baby entities", () => {
        const world = new ExtraWorld()
        expect(world.entity).toBeInstanceOf(ExtraEntity)
    })
})
