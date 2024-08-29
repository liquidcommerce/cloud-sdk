import typescript from 'rollup-plugin-typescript2';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

const require = createRequire(import.meta.url);

const pkg = require('./package.json');

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

const commonPlugins = [
  replace({
    preventAssignment: true,
    values: {
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
      'process.env.GOOGLE_PLACES_API_KEY': JSON.stringify(process.env.GOOGLE_PLACES_API_KEY),
      'process.env.ENV': JSON.stringify(process.env.ENV),
    },
  }),
  typescript({
    typescript: require('typescript'),
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: 'dist/types',
      },
    },
    useTsconfigDeclarationDir: true,
  }),
  nodeResolve({
    browser: true,
    preferBuiltins: false,
  }),
  commonjs(),
];

const devPlugins = [
  serve({
    open: true,
    contentBase: ['.', 'demo'], // Serve from root and demo directories
    host: 'localhost',
    port: 3000,
  }),
  livereload({ watch: ['dist', 'demo'] }),
];

const demoPlugins = [...commonPlugins]

if (!isProd) {
  demoPlugins.push(...devPlugins)
}

export default [
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: !isProd,
    },
    plugins: [...commonPlugins, isProd && terser()],
    external: ['@stripe/stripe-js'],
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: !isProd,
      exports: 'named',
    },
    plugins: [...commonPlugins, isProd && terser()],
    external: ['@stripe/stripe-js'],
  },
  // UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/liquidcommerce-cloud-sdk.js',
      format: 'umd',
      name: 'LiquidCommerce',
      sourcemap: !isProd,
      exports: 'named',
      globals: {
        '@stripe/stripe-js': 'Stripe',
      },
    },
    plugins: [...commonPlugins, isProd && terser()],
  },
];