import { ExtraWorld } from "../../extra-ecsy/index"





const minFrameDeltaMillis = 50





describe("execution", () => {
    it("creates a baby world", () => {
        const world = new ExtraWorld()
        expect(world)
            .toBeInstanceOf(ExtraWorld)
    })

    it("waits to start", async done => {
        const world = new ExtraWorld()
        world._beforeExecute = () => { throw new Error("it started") }
        setTimeout(done, minFrameDeltaMillis);
    })
    // it("starts manually", async (done) => {
    //     const world = new ExtraWorld()
    //     world.start()
    //     // world._beforeExecute = () => done()
    //     world.execute = () => done()
    // })
    it("stops", async (done) => {
        const world = new ExtraWorld()
        world.start()
        world.stop()
        world._beforeExecute = () => { throw new Error("it didnt stop") }
        setTimeout(done, minFrameDeltaMillis);
    })



})