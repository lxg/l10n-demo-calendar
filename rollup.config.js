import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/calendar.js',
  output: {
    file: 'dist/calendar.js',
    format: 'iife'
  },
  plugins: [json(), resolve()]
}
