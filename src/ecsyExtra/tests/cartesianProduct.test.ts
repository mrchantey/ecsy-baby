


// const cartesianProduct = ar

import { cartesianProduct } from "ecsyExtra/utility/ArrayExt"

const arraysSimple = [
    ['a'],
    ['b', 'c', 'd', 'e'],
    ['f', 'g', 'h'],
]
const arraysComplex = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
]


describe("cartesian product", () => {

    it("works", () => {
        const result = cartesianProduct(arraysComplex)
        // console.dir(result);
        const result1 = result[0]
        const result2 = result[3]
        expect(result1[0]).toBe('a')
        expect(result1[1]).toBe('d')
        expect(result1[2]).toBe('g')
    })
})