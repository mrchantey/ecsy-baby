import { MeshBuilder } from "babylonjs";
import { iLineOptions, iLineSystemOptions } from "./extensions";


export function redrawLineSystem(options: iLineSystemOptions) {
	MeshBuilder.CreateLineSystem(options.instance!.name, options, null)
}
export function redrawLines(options: iLineOptions) {
	MeshBuilder.CreateLines(options.instance!.name, options, null)
}
