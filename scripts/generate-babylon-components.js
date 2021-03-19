const fs = require('fs');

const path = './src/modules/core/components/BabylonComponents.ts'

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
`

components.forEach(c => {
    txt += `
export class ${c}Comp extends Component<${c}Comp> {
    value: ${c}
    static schema: ComponentSchema = { value: { type: Types.Ref } }
}`
})

// txt += `\nexport const babylonComponents: ComponentConstructor<any>[] = [${componentsCompStr}]`


fs.writeFileSync(path, txt)

// console.dir(txt);