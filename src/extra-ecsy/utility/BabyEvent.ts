
export interface Action<T = void> {
	(item: T): void;
}

export interface Func<T, TResult> {
	(item: T): TResult;
}

// export interface iEvent<T = void> {
// 	invoke: Action<T>,
// 	addListener: Action<Action<T>>,
// 	removeListener: Action<Action<T>>
// }


export class BabyEvent<T = Action> {
	listeners: Array<Action<T>> = []


	constructor() {
		this.addListener = this.addListener.bind(this)
		this.removeListener = this.removeListener.bind(this)
		this.invoke = this.invoke.bind(this)
	}

	addListener(listener: Action<T>) {
		const index = this.listeners.indexOf(listener);
		if (index === -1) {
			this.listeners.push(listener);
			return true
		}
		return false
	}

	removeListener(listener: Action<T>) {
		const index = this.listeners.indexOf(listener);
		if (index > -1) {
			this.listeners.splice(index, 1)
			return true
		}
		return false
	}

	invoke(args: T) {
		this.listeners.forEach(listener => listener(args))
	}

	clone() {
		const next = new BabyEvent<T>()
		next.listeners = [...this.listeners]
		return next
	}
	copy(other: BabyEvent<T>) {
		this.listeners = [...other.listeners]
	}
}

// export function createEvent<T = void>(): iEvent<T> {

// 	const listeners: Array<Action<T>> = []

// 	function addListener(listener: Action<T>) {
// 		const index = listeners.indexOf(listener);
// 		if (index === -1) {
// 			listeners.push(listener);
// 			return true
// 		}
// 		return false
// 	}

// 	function removeListener(listener: Action<T>) {
// 		const index = listeners.indexOf(listener);
// 		if (index > -1) {
// 			listeners.splice(index, 1)
// 			return true
// 		}
// 		return false
// 	}



// 	function invoke(args?: any) {
// 		listeners.forEach(listener => listener(args))
// 	}

// 	return {
// 		invoke,
// 		addListener,
// 		removeListener
// 	}


// }