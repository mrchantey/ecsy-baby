const fs = require('fs');


const ignore = [
    './src/modules',
    './src/zz-archive',
    './src/zz-deprecated'

]




function getDirsRecursive(parentDir, depth = -1, arr = []) {
    fs.readdirSync(parentDir)
        .forEach(file => {
            const path = `${parentDir}/${file}`
            const stat = fs.statSync(path);
            // console.dir(stat);
            if (stat.isDirectory()) {
                arr.push(path)
                arr = getDirsRecursive(path, depth - 1, arr)
            }
            // else if (depth !== 0)
        })
    return arr
}


const dirs = getDirsRecursive('./src')
    .filter(dir => !ignore.includes(dir))



dirs.forEach(dir => {
    const contents = fs.readdirSync(dir)
        .map(name => `export * from "./${name.split('.')[0]}"`)
        .join('\n')
    console.log(contents);
    fs.writeFileSync(`${dir}/index.ts`, contents)
})

console.dir(dirs);
