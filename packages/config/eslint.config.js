import prettier from 'eslint-config-prettier';
import ts from 'typescript-eslint';

export default ts.config(
  {
    ignores: ['**/dist/**', '.next/**', '**/node_modules/**'],
  },
  ...ts.configs.recommended,
  prettier, // Disables ESLint rules that conflict with Prettier
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
);
