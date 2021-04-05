
export const PI = 3.14159265359
export const TWO_PI = 6.28318530718
export const HALF_PI = 1.57079632679
export const QUARTER_PI = 0.78539816339
export const ONEANDHALF_PI = 4.71238898038
export const THREEQUARTER_PI = 2.35619449019
export const clamp = (a: number, min: number, max: number) => Math.min(Math.max(a, min), max)
export const randomBool = () => Math.random() >= 0.5

export const roundToNearest = (val: number, interval: number) => interval * Math.round(val / interval)
export const isValid = (val: number) => isFinite(val) && !isNaN(val)

// export function signedToUnsignedTheta(theta: number) {
// 	if (theta > PI)
// 		return theta - TWO_PI
// 	else if (theta < -PI)
// 		return theta + TWO_PI
// 	else
// 		return theta
// }
export const signedToUnsignedTheta = (theta: number) => (theta + TWO_PI) % TWO_PI