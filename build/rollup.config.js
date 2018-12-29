'use strict'

const path    = require('path')
const babel   = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')

const pkg     = require(path.resolve(__dirname, '../package.json'))
const year    = new Date().getFullYear()

const external = [
	'fabric'
]
const plugins = [
  babel({
    exclude: 'node_modules/**',
    externalHelpersWhitelist: [
      'defineProperties',
      'createClass',
      'inheritsLoose',
      'defineProperty',
      'objectSpread'
    ]
  })
]
const globals = {
  fabric: 'fabric'
}
module.exports = {
  input: path.resolve(__dirname, '../js/index.js'),
  output: {
    banner: `/*!
  * Airglass v${pkg.version} (${pkg.homepage})
  * Copyright ${year} ${pkg.author}
  * Licensed under MIT (https://github.com/lanserdi/Airglass/blob/master/LICENSE)
  */`,
    file: path.resolve(__dirname, `../site/static/js/airglass.js`),
    format: 'umd',
    globals,
    name: 'Airglass'
  },
  external,
  plugins
}
