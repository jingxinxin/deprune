import depcheck from 'depcheck'
import inquirer from 'inquirer'
import chalk from 'chalk'
import _ from 'lodash'
import reP from './rePackage'
import execa from 'execa'
import ora from 'ora'

const options = {
    // ignoreBinPackage: false, // ignore the packages with bin entry
    // skipMissing     : false, // skip calculation of missing dependencies
    // ignorePatterns: [
    //     'sandbox',
    //     'dist',
    //     'bower_components',
    //     'generated',
    //     '.generated',
    //     'build',
    //     'fixtures',
    //     'jspm_packages'
    // ],
    // ignoreMatches : [
    //     'gulp-*',
    //     'grunt-*',
    //     'karma-*',
    //     'angular-*',
    //     'babel-*',
    //     'metalsmith-*',
    //     'eslint-plugin-*',
    //     '@types/*',
    //     'grunt',
    //     'mocha',
    //     'ava'
    // ]
}

depcheck(process.cwd(), options).then((unused) => {
    // console.log('Unused dependencies')
    // console.log(unused.dependencies)
    // console.log('Unused devDependencies')
    // console.log(unused.devDependencies)
    // console.log('Missing dependencies')
    // console.log(unused.missing)
    // console.log('Using dependencies')
    // console.log(unused.using)
    // console.log(unused.invalidFiles)
    // console.log(unused.invalidDirs)

    const deps = _.omitBy(unused, _.isEmpty)

    let choices: any = [ unselectable() ]
    _.mapKeys(deps, (values, key) => {
        const group = _.find(UI_GROUPS, [ 'type', key ])
        if (group) {
            choices.push(unselectable({ title: group.title }))
            if (_.isArray(values)) values.map(value => choices.push({ name: value }))
            if (_.isPlainObject(values)) _.keys(values).map(value => choices.push({ name: value }))
            choices.push(unselectable())
        }
    })

    choices.push(unselectable({ title: 'Space to select. Enter to start pruning. Control-C to cancel.' }))

    const question = [
        {
            name    : 'packages',
            message : 'Choose which extraneous packages to remove.',
            type    : 'checkbox',
            choices,
            pageSize: process.stdout.rows - 2
        }
    ]

    inquirer
        .prompt(question)
        .then(async (answers: any) => {
            // Use user feedback for... whatever!!
            const { packages } = answers

            if (!packages || !packages.length) {
                console.log('No packages selected for prune.')
                return false
            }

            await reP(packages)

            const spinner = ora(`Pruning using ${chalk.green('npm prune')}...`)
            spinner.start()

            execa('npm',['prune']).then(output => {
                spinner.stop();
                console.log(output.stdout);
                console.log(output.stderr);

                console.log(chalk.green(`[deprune] prune complete!`));
            }).catch(err => {
                spinner.stop();
                throw err;
            });



        })
        .catch(error => {
            console.log(error)
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        })
    // const choicesGrouped = UI_GROUPS.map(group => createChoices(deps, group))
    //     .filter(Boolean)
})

// With Promises:
// fs.writeJsonSync('./package.json', { name: 'fs-extra' })

// const packageObj = fse.readJsonSync('./package.json')
// console.log(packageObj)

const unselectable = (options?: any) => new inquirer.Separator(chalk.reset(options ? options.title : ' '))

const UI_GROUPS = [
    {
        title: `${chalk.bold.underline.red('Unused dependencies')} ${chalk.red('an array containing the unused dependencies.')}`,
        type : 'dependencies'
    },
    {
        title: `${chalk.bold.underline.magenta('Unused devDependencies')} ${chalk.magenta('an array containing the unused devDependencies.')}`,
        type : 'devDependencies'
    },
    {
        title: `${chalk.bold.underline.yellow('Missing dependencies')} ${chalk.yellow('a lookup containing the dependencies missing in `package.json` and where they are used.')}`,
        type : 'missing'
    },
    {
        title: `${chalk.bold.underline.green('Using dependencies')} ${chalk.green('a lookup indicating each dependency is used by which files.')}`,
        type : 'using'
    }
    // unselectable({ title: `${chalk.bold.underline.red('Unused dependencies')} ${chalk.red('Backwards-compatible bug fixes.')}` }),
    // unselectable({ title: `${chalk.bold.underline.magenta('Unused devDependencies')} ${chalk.magenta('Backwards-compatible bug fixes.')}` }),
    // unselectable({ title: `${chalk.bold.underline.yellow('Missing dependencies')} ${chalk.yellow('Backwards-compatible bug fixes.')}` }),
    // unselectable({ title: `${chalk.bold.underline.green('Using dependencies')} ${chalk.green('Backwards-compatible bug fixes.')}` }),
]