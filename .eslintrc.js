module.exports = {
    env: {
        node: true,
        es2021: true,
        mocha: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        // Code style
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        
        // Best practices
        'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
        'no-console': 'off', // Allow console for logging
        'no-debugger': 'error',
        'no-alert': 'error',
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        
        // ES6+
        'prefer-const': 'error',
        'no-var': 'error',
        'arrow-spacing': 'error',
        'template-curly-spacing': 'error',
        
        // Node.js specific
        'global-require': 'off',
        'no-process-exit': 'error',
        
        // Security
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        
        // Code quality
        'complexity': ['warn', 10],
        'max-depth': ['warn', 4],
        'max-lines': ['warn', 300],
        'max-params': ['warn', 5]
    },
    globals: {
        // Express.js globals
        'app': 'readonly',
        'req': 'readonly',
        'res': 'readonly',
        'next': 'readonly'
    }
};
