



export function isEmpty(val: any | undefined) {
    return (val === null || val === undefined)
}


export function wait(duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration));
}


export function waitForRequestAnimationFrame() {
    return new Promise((resolve) => window.requestAnimationFrame(resolve));
}
