import eslint from '@eslint/js';
import { FlatCompat } from "@eslint/eslintrc";
import ParserTypescriptEslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import PluginImport from 'eslint-plugin-import';
import unicornPlugin from 'eslint-plugin-unicorn';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  eslint.configs.recommended,
  ...ParserTypescriptEslint.configs.recommended,
  ...compat.env({
    node: true,
    browser: true
  }),
  {
    ignores: ['**/*.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['node_modules', '**/dist', 'coverage', '*.config.ts', 'rollup.config.js', '*.d.ts'],
    plugins: {
      '@typescript-eslint': ParserTypescriptEslint.plugin,
      import: PluginImport,
      unicorn: unicornPlugin,
      sonarjs: sonarjsPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
    languageOptions: {
      parser: ParserTypescriptEslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: '.',
        sourceType: "module"
      },
      globals: {
        process: 'readonly'
      }
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['*.ts', '*.tsx'],
      },
      "import/resolver": {
        ...PluginImport.configs.typescript.settings['import/resolver'],
        typescript: {
          project: ["tsconfig.json"],
        },
      }
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/no-nested-ternary': 'off',
      'unicorn/no-for-loop': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/expiring-todo-comments': 'off',
      'unicorn/no-await-expression-member': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-useless-fallback-in-spread': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-number-properties': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-static-only-class': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/consistent-destructuring': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'sonarjs/no-duplicate-string': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-unresolved': 'error',
      'import/no-named-as-default-member': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          vars: 'all',
          args: 'after-used',
        },
      ],
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/no-named-as-default': 'off',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
        },
      ],
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            Object: {
              message: 'Avoid using the `Object` type. Did you mean `object`?',
            },
            Function: {
              message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
            },
            Boolean: {
              message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
              fixWith: 'boolean',
            },
            Number: {
              message: 'Avoid using the `Number` type. Did you mean `number`?',
              fixWith: 'number',
            },
            Symbol: {
              message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
              fixWith: 'symbol',
            },
            String: {
              message: 'Avoid using the `String` type. Did you mean `string`?',
              fixWith: 'string',
            },
            '{}': {
              message: 'Use Record<K, V> instead',
              fixWith: 'Record<K, V>',
            },
            object: {
              message: 'Use Record<K, V> instead',
              fixWith: 'Record<K, V>',
            },
          },
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          overrides: {
            constructors: 'off',
          },
        },
      ],
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
        },
      ],
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      'no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'keyword-spacing': 'off',
      '@typescript-eslint/keyword-spacing': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-use-before-declare': 'off',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
          filter: {
            regex: '^_.*$',
            match: false,
          },
        },
        {
          selector: 'objectLiteralProperty',
          format: null,
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['are', 'is', 'should', 'has', 'can', 'did', 'will'],
        },
      ],
      '@typescript-eslint/type-annotation-spacing': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      'no-await-in-loop': 'off',
      'padding-line-between-statements': ['error', { blankLine: 'always', prev: 'multiline-block-like', next: '*' }],
      'arrow-body-style': 'error',
      'arrow-parens': ['error', 'always'],
      complexity: 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'rxjs/Rx',
              message: "Please import directly from 'rxjs' instead",
            },
          ],
        },
      ],
      'object-curly-spacing': ['error', 'always'],
      'no-multi-spaces': 'error',
      'no-async-promise-executor': 'off',
      'no-useless-return': 'error',
      'no-else-return': 'error',
      'no-implicit-coercion': 'error',
      'constructor-super': 'error',
      yoda: 'error',
      strict: ['error', 'never'],
      curly: 'error',
      'dot-notation': 'error',
      'eol-last': 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-match': 'error',
      'max-classes-per-file': ['error', 2],
      'max-len': [
        'error',
        {
          code: 200,
        },
      ],
      'new-parens': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-constant-condition': 'error',
      'no-dupe-else-if': 'error',
      'lines-between-class-members': ['error', 'always'],
      'no-console': [
        'error',
        {
          allow: [
            'info',
            'dirxml',
            'warn',
            'error',
            'dir',
            'timeLog',
            'assert',
            'clear',
            'count',
            'countReset',
            'group',
            'groupCollapsed',
            'groupEnd',
            'table',
            'Console',
            'markTimeline',
            'profile',
            'profileEnd',
            'timeline',
            'timelineEnd',
            'timeStamp',
            'context',
          ],
        },
      ],
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'off',
      'no-constant-binary-expression': 'off',
      'no-empty': 'error',
      'no-eval': 'error',
      'no-useless-catch': 'off',
      'no-extra-bind': 'error',
      'no-fallthrough': 'error',
      'no-invalid-this': 'off',
      'no-irregular-whitespace': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-redeclare': 'error',
      'no-return-await': 'off',
      'no-sequences': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-shadow': 'off',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-unsafe-finally': 'error',
      'no-unused-expressions': 'off',
      'no-unused-labels': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      radix: 'error',
      'use-isnan': 'error',
      'valid-typeof': 'off',
      'space-before-function-paren': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,cjs,mjs}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'error',
    },
    languageOptions: {
      globals: {
        window: false,
        document: false,
        navigator: false,
        console: false,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
  prettierConfig,
];
