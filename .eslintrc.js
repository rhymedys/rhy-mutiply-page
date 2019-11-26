// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    "parser": "babel-eslint"
  },
  env: {
    browser: true,
    "node": true,
    "commonjs": true,
    "es6": true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // extends: 'standard',
  extends: [
    "plugin:vue/essential",
    "plugin:vue/recommended",
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'vue'
  ],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // // allow paren-less arrow functions
    // 'arrow-parens': 0,
    // "no-restricted-syntax": 0,
    // 'import/extensions': ['error', 'always', {
    //   'js': 'never',
    //   'vue': 'never'
    // }],
    // "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    // "no-use-before-define": 0,
    // // allow async-await
    // 'generator-star-spacing': 0,
    // "space-before-function-paren": [0, "always"],
    // // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'no-unused-expressions': 0,
    // "max-len": [0, 80, 4],
    // 'semi': ['error', 'never'],
    // "comma-dangle": [2, "never"],
    // "no-param-reassign": ["error", {
    //   "props": false
    // }],
    // "no-plusplus": ["error", {
    //   "allowForLoopAfterthoughts": true
    // }],
    // "no-shadow": ["error", {
    //   "allow": ["done", "state", "cbState", "val", "res"]
    // }],
    // "no-restricted-syntax": 0,
    // "class-methods-use-this": 0,
    // "no-return-await": 0
  }
}
