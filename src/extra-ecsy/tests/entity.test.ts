import { ExtraWorld } from ".."
import { TestValueComponent } from "./testTypes"


describe("entity", () => {
    const world = new ExtraWorld()
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
