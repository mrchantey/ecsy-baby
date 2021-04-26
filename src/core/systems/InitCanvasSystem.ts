
import { Canvas } from "core/components";
import { ExtraSystem } from "ecsyExtra";

export class InitCanvasSystem extends ExtraSystem {
    start() {
        let canvas = this.getSingletonComponent(Canvas)?.value
        if (canvas)
            return
        canvas = document.getElementsByTagName('canvas')[0]
        if (!canvas) {
            canvas = document.createElement('canvas')
            document.body.appendChild(canvas)
        }
        this.setSingletonComponent(Canvas, { value: canvas })
    }
}