import {terser} from 'rollup-plugin-terser'
import ts from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  plugins: [
    ts(),
    terser({
      output: {
        comments: false
      }
    })
  ],
  output: [
    {
      format: 'es',
      sourcemap: true,
      file: 'dist/tilemap.es.js'
    },
    {
      format: 'umd',
      sourcemap: true,
      name: 'tilemap',
      file: 'dist/tilemap.min.js'
    }
  ]
}
