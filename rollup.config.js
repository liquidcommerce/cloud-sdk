import typescript from 'rollup-plugin-typescript2';
import { createRequire } from 'module';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

dotenv.config();

const require = createRequire(import.meta.url);

const pkg = require('./package.json');

// Get environment from NODE_ENV or default to development
const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';
const isDev = !isProd;

const sourcemap = isDev; // Enable sourcemaps in development

const commonPlugins = [
  replace({
    preventAssignment: true,
    values: {
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.GOOGLE_PLACES_API_KEY': JSON.stringify(process.env.GOOGLE_PLACES_API_KEY),
      'process.env.ORDER_API_USER': JSON.stringify(process.env.ORDER_API_USER),
      'process.env.ORDER_API_PASSWORD': JSON.stringify(process.env.ORDER_API_PASSWORD),
      'process.env.ENV_LOC': JSON.stringify(process.env.ENV_LOC),
      'process.env.ENV_DEV': JSON.stringify(process.env.ENV_DEV),
      'process.env.ENV_STAGE': JSON.stringify(process.env.ENV_STAGE),
      'process.env.ENV_PROD': JSON.stringify(process.env.ENV_PROD),
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
    preferBuiltins: false,
  }),
  commonjs(),
];

// Development-only plugins
const devPlugins = isDev ? [
  serve({
    open: false,
    contentBase: ['.', 'demo'],
    host: 'localhost',
    port: 3000,
  }),
  livereload({ watch: ['dist', 'demo'] }),
] : [];

export default [
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap,
    },
    plugins: [...commonPlugins, ...devPlugins, isProd && terser()].filter(Boolean),
    external: ['@stripe/stripe-js'],
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap,
      exports: 'named',
    },
    plugins: [...commonPlugins, ...devPlugins, isProd && terser()].filter(Boolean),
    external: ['@stripe/stripe-js'],
  },
  // UMD build (separate directory)
  {
    input: 'src/index.umd.ts',
    output: {
      file: 'umd/liquidcommerce-cloud-sdk.min.js',
      format: 'umd',
      name: 'LiquidCommerce',
      sourcemap,
      exports: 'named',
      globals: {
        '@stripe/stripe-js': 'Stripe',
      },
    },
    plugins: [
      ...commonPlugins,
      ...devPlugins,
      replace({
        'typeof window': JSON.stringify('object'),
        preventAssignment: true,
      }),
      isProd && terser({
        compress: {
          drop_console: true,
          passes: 3,
        },
        mangle: {
          toplevel: true,
          properties: {
            regex: /^_/,
          },
          reserved: ['LiquidCommerce', 'OrderLiquidCommerce', 'LIQUID_COMMERCE_ENV'],
        },
        output: {
          comments: false,
        },
      }),
    ].filter(Boolean),
  },
  // SSR build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/liquidcommerce-cloud-sdk.ssr.js',
      format: 'cjs',
      sourcemap,
      exports: 'named',
    },
    plugins: [
      ...commonPlugins,
      replace({
        'typeof window': JSON.stringify('undefined'),
        preventAssignment: true,
      }),
      isProd && terser({
        compress: {
          drop_console: true,
          passes: 3,
        },
        mangle: {
          toplevel: true,
          properties: {
            regex: /^_/,
          },
          reserved: ['LiquidCommerce', 'OrderLiquidCommerce', 'LIQUID_COMMERCE_ENV'],
        },
        output: {
          comments: false,
        },
      }),
    ].filter(Boolean),
    external: ['@stripe/stripe-js'],
  },
];