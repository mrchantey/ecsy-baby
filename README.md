# ecsy, baby
A community project for easy implementation of [ecsy](https://ecsy.io/) in [babylon.js](https://www.babylonjs.com/).

## Getting Started

```js
import 
initialize()
```
### Spinning Cube Demo
- [source](examples/spinning-cube/src/index.ts)
- [demo](https://mrchantey.github.io/ecsy-baby/examples/spinning-cube)

### Building

```
npm install
npm run build
```


## TODO
- multiple examples

### Notes
The base of this project is a port from ecsy-three, with a few distinctions made due to the difference in nature between three.js and babylon.js.
- Instead of a `WebGLRendererComponent`, ecsy-baby has a 
- In babylonjs all objects inherit from a node except for a scene

### Danger zone
- The current implementation of the 'execute' method means that only systems with a populated query will be run.
	- This means that systems which run on external resources or singletons may be excluded from the execute loop.
- Unlike Unity, Babylonjs does not automatically update the world matrix, this must be done manually

### Changelog

- 0.0.5
	- first spinning cube

### Gotchyas

- Circular Dependency
	- Symptoms:
		- `cannot read property "isComponent" | "_typeId" of undefined` 
		- enums and variables undefined or `cannot access before initialization`
	- Prognosis: Circular Dependencies
	- Prescription: 
		- read [this](//https://spin.atomicobject.com/2018/06/25/circular-dependencies-javascript/) 
		- never import from index.js, unless from seperate thing
		- we're gonna get in trouble because register depends on core and core depends on register
	- note: npm run check-circular will not find all of them
	- example 1
		```ts
		// INCORRECT
		// ./register.ts
		import {SceneComp} from "./modules/core"
		// ./modules/core/index.ts
		import {SystemPriority} from "../../"
		// CORRECT
		// ./register.ts
		import {SceneComp} from "./"
		```
	- example 2
		```ts
		// INCORRECT
		import { SceneComp } from '../../';
		
		// CORRECT
		import { SceneComp } from '../components/BabylonComponents';
		```
- Typescript playing with `dist` or other forbidden folder 
	- Symptoms: Cannot write file '../dist/../*.d.ts' because it would overwrite input file.
	- Prognosis: 
		- A file is importing from dist folder
			`import { CameraComp } from '../../../dist/modules/core/module';`
		- Delete dist folder to find out who
		- OR typescript is trying to include dist
			```json
			//tsconfig.json
			{
				"exclude": [
					"./dist"
				]
			}
			```
- Unregistered components
	- while ecsy will be helpful when including unregistered components in system queries, this is not the case when using the `Not()` function to exclude components.
- Singleton ecsy worlds
	- Symptoms: 
		1. create world
		2. register component
		3. create world 2
		4. is component registered ? no
		5. can use component? yes
- Systems throw on register
	- Symptoms: 
	- Prognosis:
		- Weird import error, when registering components, try importing directly from source folder.
	- Prescription:
		- same as for circular dependencies, especially when registering components