/*
 * @Author: nhsoft.wh
 * @Date: 2024-01-20 15:48:03
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2024-01-20 17:20:59
 * @Description: file content
 */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0
  }
}
