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
