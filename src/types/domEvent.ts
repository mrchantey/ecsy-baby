




export type iHtmlEvents = {
	[key in keyof HTMLElementEventMap]?: HTMLElementEventMap[key]
};
export type iWindowEvents = {
	[key in keyof WindowEventMap]?: WindowEventMap[key]
}
