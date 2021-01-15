# ecsy, baby
A community project for easy implementation of [ecsy](https://ecsy.io/) in [babylon.js](https://www.babylonjs.com/).

The base of this project is a port from ecsy-three, with a few distinctions made due to the difference in nature between three.js and babylon.js.

### Render Loop
- Instead of a `WebGLRendererComponent`, ecsy-baby has a 
- In babylonjs all objects inherit from a node except for a scene


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


### Changelog

- 0.0.5
	- first spinning cube