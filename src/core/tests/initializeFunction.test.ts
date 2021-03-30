import { BabyWorld } from "../../base/index"
import { initialize } from "../initialize"



const minFrameDeltaMillis = 50



describe("initializeFunction", () => {
    it("runs once", () => {
        expect(initialize)
            .not.toThrow()
    })

    it("runs twice", () => {
        expect(initialize)
            .not.toThrow()
        expect(initialize)
            .not.toThrow()
    })
    it("returns a baby world", () => {
        const { world } = initialize()
        expect(world)
            .toBeInstanceOf(BabyWorld)
    })
    it("starts automatically", async done => {
        const { world } = initialize()
        world._beforeExecute = () => done()
    })
    it("waits to start", async done => {
        const { world } = initialize({ start: false })
        world._beforeExecute = () => { throw new Error("it started") }
        setTimeout(done, minFrameDeltaMillis);
    })
    it("starts manually", async (done) => {
        const { world } = initialize({ start: false })
        world.start()
        world._beforeExecute = () => done()
        world.execute = () => done()
    })
    it("stops", async (done) => {
        const world = new BabyWorld()
        world.start()
        world.stop()
        world._beforeExecute = () => { throw new Error("it didnt stop") }
        setTimeout(done, minFrameDeltaMillis);
    })



})