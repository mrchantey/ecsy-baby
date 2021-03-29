import { initialize } from "../../initialize"
import { BabyEntity } from "../index"
import { BabyWorld } from "../index"
import { wait } from "../utility/jsUtility"

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


const minFrameDeltaMillis = 50


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
        world.beforeRender = () => done()
    })
    it("waits to start", async done => {
        const { world } = initialize({ start: false })
        world.beforeRender = () => { throw new Error("it started") }
        setTimeout(done, minFrameDeltaMillis);
    })
    it("starts manually", async (done) => {
        const { world } = initialize({ start: false })
        world.start()
        world.beforeRender = () => done()
    })
    it("stops", async (done) => {
        const world = new BabyWorld()
        world.start()
        world.stop()
        world.beforeRender = () => { throw new Error("it didnt stop") }
        setTimeout(done, minFrameDeltaMillis);
    })



})