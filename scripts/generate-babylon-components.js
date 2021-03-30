const fs = require('fs');

const path = './src/core/components/BabylonComponents.ts'

const components = [
    'Engine',
    'Scene',
    'TargetCamera',
    'Node',
    'TransformNode',
    'StandardMaterial',
]


const componentsStr = components.join(', ')
const componentsCompStr = components.map(c => `${c}Comp`).join(', ')


let txt = `
import { ${componentsStr} } from 'babylonjs'
import { Component, ComponentConstructor, ComponentSchema, Types } from 'ecsy';
import { ValueComponent } from '../../base'
`

components.forEach(c => {
    txt += `
export class ${c}Comp extends ValueComponent<${c}Comp,${c}> {
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}`
})
// value: ${c}

// txt += `\nexport const babylonComponents: ComponentConstructor<any>[] = [${componentsCompStr}]`


fs.writeFileSync(path, txt)

// console.dir(txt);