module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: [],
    rules: {
        strict: 0,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
