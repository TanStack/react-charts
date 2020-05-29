import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'
import resolve from '@rollup/plugin-node-resolve'

const external = ['react']

const globals = {
  react: 'React',
}

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-charts.min.mjs',
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [resolve(), babel(), terser()],
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ReactCharts',
      file: 'dist/react-charts.development.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [resolve(), babel()],
  },
  {
    input: 'src/index.js',
    output: {
      name: 'ReactCharts',
      file: 'dist/react-charts.production.min.js',
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [resolve(), babel(), terser(), size()],
  },
]
