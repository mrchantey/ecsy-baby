export interface Action<T = void> {
	(item: T): void;
}

export interface Func<T, TResult> {
	(item: T): TResult;
}
