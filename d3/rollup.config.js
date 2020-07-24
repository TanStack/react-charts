import path from 'path'
import babel from 'rollup-plugin-babel'
import node from 'rollup-plugin-node-resolve'
// import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: path.join(__dirname, 'entry.js'),
    output: {
      format: 'es',
      file: path.join(__dirname, 'index.js'),
    },
    plugins: [node(), babel()],
    onwarn,
  },
]

function onwarn(message) {
  if (message.code === 'CIRCULAR_DEPENDENCY') {
    return
  }
  console.error(message)
}
