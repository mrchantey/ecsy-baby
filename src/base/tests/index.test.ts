import { BabyEntity } from "../index"
import { BabyWorld } from "../index"
import { wait } from "../utility/jsUtility"
import { TestValueComponent } from "./testTypes"

describe("jsdom", () => {

    const testText = "hello world"

    it("sets the NODE_ENV var", () => {
        expect(process.env.NODE_ENV).toBe('test')
    })
    it("manipulates the dom", () => {
        const div = document.createElement("div")
        div.innerHTML = testText
        document.body.appendChild(div)
        const txt = document.querySelector("div")?.innerHTML
        expect(txt).toBe(testText)
    })
})


describe("world", () => {
    const world = new BabyWorld()
    it("is a baby world", async () => {
        expect(world)
            .toBeInstanceOf(BabyWorld)
    })
    it("creates the singleton entity", () => {
        const world = new BabyWorld()
        expect(world.entity).toBeTruthy()
    })
    it("creates baby entities", () => {
        const world = new BabyWorld()
        expect(world.entity).toBeInstanceOf(BabyEntity)
    })
})


describe("entity", () => {
    const world = new BabyWorld()
    const entity = world
        .registerComponent(TestValueComponent)
        .createEntity("test entity")


    const actualWarn = console.warn

    it("adds components", () => {
        entity.addComponent(TestValueComponent, { value: 3 })
        expect(entity.getComponent(TestValueComponent)?.value).toBe(3)
    })
    it("warns on re-adding component", () => {
        const mockWarn = jest.fn()
        console.warn = mockWarn
        entity.addComponent(TestValueComponent)
        expect(mockWarn.mock.calls.length).toBe(1)
    })

    it("removes components", () => {
        entity.removeComponent(TestValueComponent)
        expect(entity.getComponent(TestValueComponent)?.value)
            .toBeUndefined()
    })
    it("sets components", () => {
        entity.setComponent(TestValueComponent, { value: 4 })
        expect(entity.getComponent(TestValueComponent)?.value)
            .toBe(4)
        entity.setComponent(TestValueComponent, { value: 5 })
        expect(entity.getComponent(TestValueComponent)?.value)
            .toBe(5)
        entity.removeComponent(TestValueComponent)
    })

    it("gets component values", () => {
        entity.addComponent(TestValueComponent, { value: 5 })
        expect(entity.getComponentValue(TestValueComponent))
            .toBe(5)
        entity.removeComponent(TestValueComponent)
    })
    it("sets component values", () => {
        entity.setComponentValue(TestValueComponent, 5)
        expect(entity.getComponentValue(TestValueComponent))
            .toBe(5)
        entity.removeComponent(TestValueComponent)
    })


    afterEach(() => {
        console.warn = actualWarn
    })

})