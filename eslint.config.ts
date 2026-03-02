import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(...tseslint.configs.recommended, prettier, {
  languageOptions: {
    globals: globals.node,
  },
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
  },
})
