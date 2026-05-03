import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // 学习阶段先设 warn，不阻断开发；熟练后改为 error
      '@typescript-eslint/no-explicit-any': 'warn',

      // console.log 开发时允许，上线前记得清理
      'no-console': 'warn',

      // 允许空函数（占位时有用）
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
])
