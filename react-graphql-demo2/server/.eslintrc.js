module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'max-len': [0, 160, 2, { ignoreUrls: true }],
    'arrow-body-style': ['error', 'as-needed'],
    'no-unused-vars': ['error', { args: 'none' }],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  ignorePatterns: ['dist/*', 'node_moduls/*'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
