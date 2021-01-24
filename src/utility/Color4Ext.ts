import { Color4 } from "babylonjs";



export class Color4Ext {
	public static Red = () => new Color4(1, 0, 0);
	public static Green = () => new Color4(0, 1, 0);
	public static Blue = () => new Color4(0, 0, 1);
	public static Black = () => new Color4(0, 0, 0);
	public static White = () => new Color4(1, 1, 1);
	public static Purple = () => new Color4(0.5, 0, 0.5);
	public static Magenta = () => new Color4(1, 0, 1);
	public static Yellow = () => new Color4(1, 1, 0);
	public static Gray = () => new Color4(0.5, 0.5, 0.5);
	public static Teal = () => new Color4(0, 1.0, 1.0);
	public static Random = () => new Color4(Math.random(), Math.random(), Math.random());
	public static Clear = () => new Color4(0, 0.0, 0.0, 0.0);

}