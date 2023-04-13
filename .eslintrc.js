module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import-alias'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // General
    'array-callback-return': 'warn',
    'capitalized-comments': [
      'error',
      'always',
      { line: { ignoreConsecutiveComments: true } },
    ],
    'default-param-last': 'error',
    'id-length': ['warn', { properties: 'never', exceptionPatterns: ['^_'] }],
    'max-lines': [
      'error',
      { max: 250, skipBlankLines: true, skipComments: true },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-multi-assign': 'error',
    'no-multi-spaces': 'warn',
    'no-negated-condition': 'off',
    'no-nested-ternary': 'off',
    'no-prototype-builtins': 'warn',
    'no-restricted-imports': 'warn',
    'no-shadow': 'off',
    'no-underscore-dangle': ['warn', { allow: ['_id'] }],
    'no-var': 'error',
    'object-shorthand': 'warn',
    'one-var': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-object-spread': 'warn',
    'sort-keys': ['error', 'asc', { caseSensitive: false, natural: true }],
    'sort-vars': 'error',

    // Import Plugin - rules available via `eslint-plugin-import`.
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // Typescript Plugin - rules available via `@typescript-eslint`.
    '@typescript-eslint/no-shadow': ['error'],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['functions', 'arrowFunctions', 'methods'] },
    ],

    // Import alias Plugin - rules available via `eslint-plugin-import-alias`.
    'import-alias/import-alias': [
      'error',
      {
        relativeDepth: 2,
        aliases: [
          { alias: '@journals', matcher: 'src/journals' },
          { alias: '@auth', matcher: 'src/auth' },
          { alias: '@common', matcher: 'src/common' },
          { alias: '@users', matcher: 'src/users' },
          { alias: '@', matcher: './src' },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@journals', './src/journals'],
          ['@auth', './src/auth'],
          ['@common', './src/common'],
          ['@users', './src/users'],
          ['@', './src'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/external-module-folders': ['node_modules'],
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
