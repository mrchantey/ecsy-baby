const fs = require('fs');


const ignore = [
    './src/modules',
    './src/zz-archive',
    './src/zz-deprecated'
]

const ases = [
    'MatrixExt',
    'QuaternionExt',
    'Vector2Ext',
    'Vector3Ext',
]



function getDirsRecursive(optionsIn) {
    const options = {
        ...{
            parentDir: './',
            depth: -1,
            arr: [],
            includeFiles: true,
            includeDirs: true
        }, ...optionsIn
    }
    fs.readdirSync(options.parentDir)
        .forEach(file => {
            const path = `${options.parentDir}/${file}`
            const stat = fs.statSync(path);
            if (stat.isDirectory()) {
                if (options.includeDirs)
                    options.arr.push(path)
                if (options.depth !== 0)
                    options.arr = getDirsRecursive({ ...options, parentDir: path })
            }
            else if (options.includeFiles)
                options.arr.push(path)
        })
    return options.arr
}



function generateIndex(parentDir) {

    const dirs = getDirsRecursive({ parentDir, arr: [parentDir], includeFiles: false })
        .filter(dir => !ignore.includes(dir))
    dirs.forEach(dir => {
        const contents = fs.readdirSync(dir)
            .map(name => name.split('.')[0])
            .filter(name => !ignore.includes(`${dir}/${name}`))
            .filter(name => name != 'index')
            .map(name => {
                if (ases.includes(name))
                    return `export * as ${name} from "./${name}"`
                return `export * from "./${name}"`
            })
            .join('\n')
        // console.log(contents);
        fs.writeFileSync(`${dir}/index.ts`, contents)
    })
    console.log('index regenerated');
}



const parentDir = './src'

function getHash() {
    return getDirsRecursive({ parentDir }).join('\n')
}
let hash = getHash()
console.log(`watching ${parentDir}...`);
fs.watch(parentDir, { recursive: true }, val => {
    let newHash = getHash()
    if (hash !== newHash) {
        hash = newHash
        generateIndex(parentDir)
    }
})