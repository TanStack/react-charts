import path from 'path'
import node from "rollup-plugin-node-resolve";
import { terser } from 'rollup-plugin-terser'

export default {
  input: path.join(__dirname, 'entry.js'),
  output: {
    format: 'es',
    file: path.join(__dirname, 'index.js'),
  },
  plugins: [node(), terser()],
  onwarn: function ( message ) {
    if (message.code === 'CIRCULAR_DEPENDENCY') {
      return;
    }
    console.error( message );
  }
};