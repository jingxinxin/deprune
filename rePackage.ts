import fs from 'fs-extra'
import _ from 'lodash'

const parseJSON = require('json-parse-even-better-errors')

async function rePackage (packages: []) {

    let manifest
    try {
        manifest = await fs.readFileSync('./package.json', 'utf-8')
    } catch (error) {
        throw new Error('package.json not found')
    }
    try {
        manifest = parseJSON(manifest)
    } catch (error) {
        throw new Error(`Invalid package.json: ${error}`)
    }
    manifest.dependencies    = _.omit(manifest.dependencies, packages)
    manifest.devDependencies = _.omit(manifest.devDependencies, packages)

    // format content
    const {
              [ Symbol.for('indent') ] : indent,
              [ Symbol.for('newline') ]: newline,
          } = manifest

    const content = (JSON.stringify(manifest, null, indent) + '\n')
        .replace(/\n/g, newline)

    await fs.writeFileSync('./package.json', content)

}

export default rePackage