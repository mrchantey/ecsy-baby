import { Action, Func } from "./BabyEvent"




export const fromLength = <T extends unknown>(create: Func<number, T> | Func<void, T>, length: number) => {
	const arr = new Array(length)
	for (let i = 0; i < arr.length; i++) {
		arr[i] = (create as any)(i)
	}
	return arr
}

//https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
export const cartesianProduct = <T extends any>(arr: T[][]) =>
	arr.reduce((a, b) =>
		a.map((x: any) =>
			b.map((y: any) => x.concat([y]))
		).reduce((a, b) => a.concat(b), [])
		, [[]]) as T[][]
