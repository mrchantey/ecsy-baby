import { System, SystemQueries } from "ecsy"
import { TestValueComponent } from "ecsyExtra/tests/testTypes"
import { ExtraEntity, ExtraSystem, ExtraWorld } from "ecsyExtra/types"

interface iQuery {
    [queryName: string]: {
        results: ExtraEntity[]
        added?: ExtraEntity[]
        removed?: ExtraEntity[]
        changed?: ExtraEntity[]
    };
}

//https://ecsy.io/docs/#/manual/Architecture?id=reactive-queries

class TestSystem extends ExtraSystem {
    _onExecute: (entities: iQuery) => void
    execute() {
        this._onExecute(this.queries)
    }


    static queries: SystemQueries = {
        entitiesAllListeners: {
            components: [TestValueComponent],
            listen: {
                added: true,
                removed: true,
                changed: [TestValueComponent]
            }
        },
        entitiesNoListeners: {
            components: [TestValueComponent],
        }
    }
}



describe("reactive queries", () => {
    const world = new ExtraWorld()
        .registerComponent(TestValueComponent)
        .registerSystem(TestSystem)
    world.start()
    const system = world.getSystem(TestSystem)
    let entity: ExtraEntity
    beforeAll(() => {

    })

    it("has an empty 'added' array", done => {
        const mockOnExecute = (queries: iQuery) => {
            expect(queries.entitiesAllListeners.added?.length).toBe(0)
            expect(queries.entitiesNoListeners.added).toBe(undefined)
            done()
        }

        system._onExecute = mockOnExecute
        world.execute()
    })
    it("adds to 'added' array", done => {
        entity = world.createEntity("test")
            .addComponent(TestValueComponent)

        const mockOnExecute = (queries: iQuery) => {
            expect(queries.entitiesAllListeners.added?.length).toBe(1)
            done()
        }

        system._onExecute = mockOnExecute
        world.execute()
    })
    it("removes from 'added' array", done => {
        const mockOnExecute = (queries: iQuery) => {
            expect(queries.entitiesAllListeners.added?.length).toBe(0)
            done()
        }
        system._onExecute = mockOnExecute
        world.execute()
    })
    it("adds to 'removed' array", done => {

        entity.removeComponent(TestValueComponent)

        const mockOnExecute = (queries: iQuery) => {
            expect(queries.entitiesAllListeners.removed?.length).toBe(1)
            // expect(queries.entitiesNoListeners.added).toBe(undefined)
            done()
        }
        system._onExecute = mockOnExecute
        world.execute()
    })
    it("adds to 'added' AND 'removed' array", done => {

        entity.addComponent(TestValueComponent, { value: 0 })
        entity.removeComponent(TestValueComponent)
        entity.addComponent(TestValueComponent, { value: 1 })

        const mockOnExecute = (queries: iQuery) => {
            expect(queries.entitiesAllListeners.added?.length).toBe(1)
            expect(queries.entitiesAllListeners.removed?.length).toBe(1)
            const val1 = entity.getRemovedComponent(TestValueComponent)?.value
            expect(val1).toBe(0)
            const val2 = entity.getComponent(TestValueComponent)?.value
            expect(val2).toBe(1)
            done()
        }
        system._onExecute = mockOnExecute
        world.execute()
    })
})