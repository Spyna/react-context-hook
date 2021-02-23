import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  external: ['redux', 'react'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
    {
      file: pkg.unpkg,
      name: 'ReactContextHook',
      format: 'umd',
      sourcemap: true,
      globals: {
        react: 'React',
        redux: 'Redux',
        'react-dom': 'ReactDOM'
      }
    }
  ],
  plugins: [
    external(),
    url({ exclude: ['**/*.svg'] }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ]
}
