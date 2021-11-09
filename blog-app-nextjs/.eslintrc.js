module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['next', 'prettier', 'eslint-config-next', 'eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'simple-import-sort'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
  },
};
