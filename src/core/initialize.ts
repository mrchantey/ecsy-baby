import { InitEngine } from "core/components";
import { Canvas } from "core/components/Canvas";
import { DebugLines } from "core/components/DebugLines";
import { Keyboard } from "core/components/Keyboard";
import { Mouse } from "core/components/Mouse";
import { coreModule } from "core/module";
import { Component, ComponentConstructor, Entity, System, SystemConstructor, WorldOptions } from "ecsy";
import { registerModules } from "extra-ecsy/register";
import { iModule } from "extra-ecsy/types/module";
import { ExtraWorld } from "extra-ecsy/types/world";


interface iOptions {
	worldOptions?: WorldOptions,
	start?: boolean,
	modules?: iModule[],
}

export function initialize({
	worldOptions,
	start = true,
	modules = [],
}: iOptions = {}) {

	const world = new ExtraWorld(worldOptions)

	registerModules(world, [coreModule, ...modules])
	world.entity
		.addComponent(Mouse)
		.addComponent(Keyboard)
		.addComponent(DebugLines)
		.addComponent(InitEngine)

	attachCanvas(world)
	if (start) {
		world.start()
		world.execute()

	}

	return world
}



export function attachCanvas(world: ExtraWorld, canvas?: HTMLCanvasElement) {
	if (!canvas) {
		canvas = document.getElementsByTagName('canvas')[0]
		if (!canvas) {
			canvas = document.createElement('canvas')
			document.body.appendChild(canvas)
		}
	}
	world.entity
		.addComponent(Canvas, { value: canvas })
}