module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 大括号内不能为空
    'no-trailing-spaces': "off",
    'no-unused-expressions':'off',
    // 大括号内不校验空格
    "object-curly-spacing": [0, "never"],
    // String必须使用单引号
    'quotes': "off",
    // 不用table而是用两个空格
    'no-tables': "off",
    'no-tabs': 'off',
    'quote-props': "off",
    'import/no-duplicates': 'off',
    'indent': "off",
    'space-before-function-paren': "off",
    // 句末分号
    'semi': "off",
    'no-multiple-empty-lines': "off",
    'spaced-comment': "off",
    'padded-blocks': "off",
    'prefer-const': "off",
    'no-constant-condition': "off",
    'eol-last': "off",
    "no-case-declarations": "off"
  }
}
