import resolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: {
    file: './bin/index.js',
    format: 'cjs',
  },
  plugins: [resolve(), typescript()],
  external: ['@craco/craco', 'lodash', 'commander', 'fs', 'path', 'path-to-regexp'],
}
