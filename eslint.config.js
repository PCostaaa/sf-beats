import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Props destructured only to strip them before {...rest} spread are
      // intentionally "unused" (e.g. react-scroll's smooth/duration/offset).
      'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
  },
  // Node-context files: config + Playwright e2e. These run under Node, not the
  // browser, and Playwright's `use` fixture argument is not a React hook.
  {
    files: ['*.config.js', 'e2e/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
])
