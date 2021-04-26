import { Component, System } from "ecsy"
import { ExtraSystem, ExtraWorld } from "ecsyExtra"



class CompA extends Component<CompA>{ }
class CompB extends Component<CompB>{ }




class SystemA extends ExtraSystem {

    static queries = {
        compA: {
            components: [CompA],
        },
        compB: {
            components: [CompB]
        }
    }

    execute() {
        this.queryTuples.myTuple()
            .forEach(([hasCompA, hasCompB]) => {
            })
    }

    static queryTuples = {
        myTuple: [SystemA.queries.compA, SystemA.queries.compB],
        // bla:true
    }
}

describe("query tuples", () => {

    const world = new ExtraWorld()
        .registerComponent(CompA)
        .registerComponent(CompB)
        .registerSystem(SystemA)

    const system = world.getSystem(SystemA)

    world.createEntity("a1")
        .addComponent(CompA)
    world.createEntity("a2")
        .addComponent(CompA)

    world.createEntity("b1")
        .addComponent(CompB)
    world.createEntity("b2")
        .addComponent(CompB)
    world.createEntity("b3")
        .addComponent(CompB)




    beforeAll(() => {

    })

    it("returns a cartesian set", () => {


        const results = system.queryTuples.myTuple()

        const names = results.map(arr => arr.map((e: any) => e.name))
        // console.dir(names);

        expect(names[0][0]).toBe('a1')
        expect(names[0][1]).toBe('b1')
        expect(names[1][0]).toBe('a1')
        expect(names[1][1]).toBe('b2')

    })
})