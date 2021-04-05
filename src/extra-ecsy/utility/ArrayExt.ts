import { Action, Func } from "./BabyEvent"




export const fromLength = <T extends unknown>(create: Func<number, T> | Func<void, T>, length: number) => {
	const arr = new Array(length)
	for (let i = 0; i < arr.length; i++) {
		arr[i] = (create as any)(i)
	}
	return arr
}