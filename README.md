# deprune

Deprune is a tool for analyzing and Pruning unused dependencies in batches to see: how each 
dependency is used, which dependencies are useless, and which dependencies are missing from 
package.json.

![Untitled](https://user-images.githubusercontent.com/6293249/118309804-5c79d000-b520-11eb-806a-1b07bdd84a68.gif)

# Status
[![Build Status](https://github.com/jingxinxin/deprune/workflows/ci/badge.svg)](https://github.com/jingxinxin/deprune/actions)
[![NPM version](https://badge.fury.io/js/deprune.svg)](http://badge.fury.io/js/deprune)
[![codecov.io](https://codecov.io/github/jingxinxin/deprune/coverage.svg?branch=master)](https://codecov.io/github/jingxinxin/deprune?branch=main)
[![Dependency Status](https://img.shields.io/david/jingxinxin/deprune.svg)](https://david-dm.org/jingxinxin/deprune)
[![devDependencies Status](https://david-dm.org/jingxinxin/deprune/dev-status.svg)](https://david-dm.org/jingxinxin/deprune?type=dev)
[![npm](https://img.shields.io/npm/dm/deprune.svg?maxAge=2592000)]()
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fjingxinxin%2Fdeprune.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fjingxinxin%2Fdeprune?ref=badge_shield)

> Prune your npm module for unused dependencies in batches



# Requirements
* Node >= 10.



# Installation
```bash
$ npm install -g deprune
```

# Use

### On the command line

This is the easiest way to use `deprune`.
```bash
$ deprune
``` 
![image](https://user-images.githubusercontent.com/6293249/118309504-ee350d80-b51f-11eb-988a-da86f821bbde.png)


## Syntax Support

Depcheck not only recognizes the dependencies in JavaScript files, but also supports these syntaxes:

- JavaScript (ES5, ES6 and ES7)
- [React JSX](http://facebook.github.io/react/docs/jsx-in-depth.html)
- [CoffeeScript](http://coffeescript.org/)
- [Typescript](http://www.typescriptlang.org/) (with `typescript` dependency)
- [SASS and SCSS](http://sass-lang.com/) (with `node-sass` dependency)
- [Vue.js](https://vuejs.org/) (with `@vue/compiler-sfc` dependency)

To get the syntax support by external dependency, please install the corresponding package explicitly. For example, for Typescript user, install deprune with `typescript` package:

```
npm install -g deprune typescript
```

# Inspiration

* [npm prune](https://docs.npmjs.com/cli/prune.html) - Remove extraneous packages.
* [depcheck](https://github.com/depcheck/depcheck) - Check your npm module for unused dependencies.
* [npm-check](https://github.com/dylang/npm-check) - Check for outdated, incorrect, and unused dependencies..

# License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fjingxinxin%2Fdeprune.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fjingxinxin%2Fdeprune?ref=badge_large)
