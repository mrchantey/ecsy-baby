
import { Component, World } from 'ecsy';

export class CompA<T> extends Component<T> { }
export class CompB extends CompA<CompB>{ }

describe("component inheritance", () => {

    const world = new World()
        .registerComponent(CompA)
        .registerComponent(CompB)
    const entity = world.createEntity()
        .addComponent(CompB)

    it("does not recognize parent", () => {
        expect(entity.hasComponent(CompA)).toBe(false)
        expect(entity.hasComponent(CompB)).toBe(true)
    })
})