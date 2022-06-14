module.exports = {
  plugins: ['regexp'],
  extends: ['next', 'next/core-web-vitals', 'plugin:regexp/recommended', 'prettier'],
  rules: {
    '@next/next/no-img-element': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [],
        pathGroupsExcludedImportTypes: ['builtin', 'external'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        warnOnUnassignedImports: true,
      },
    ],
  },
}
