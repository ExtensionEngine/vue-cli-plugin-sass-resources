<p align="center">
  <a href="#">
    <img width="150" src="https://cdn.jsdelivr.net/gh/ExtensionEngine/vue-cli-plugin-sass-resources/media/logo.svg">
  </a>
</p>

# vue-cli-plugin-sass-resources

[![circleci build
status](https://badgen.net/circleci/github/ExtensionEngine/vue-cli-plugin-sass-resources/master?icon)](https://circleci.com/gh/ExtensionEngine/vue-cli-plugin-sass-resources)
[![npm package
version](https://badgen.net/npm/v/vue-cli-plugin-sass-resources)](https://npm.im/vue-cli-plugin-sass-resources)
[![github
license](https://badgen.net/github/license/ExtensionEngine/vue-cli-plugin-sass-resources)](https://github.com/ExtensionEngine/vue-cli-plugin-sass-resources/blob/master/LICENSE)
[![js @extensionengine
style](https://badgen.net/badge/code%20style/@extensionengine/black)](https://github.com/ExtensionEngine/eslint-config)

Vue CLI plugin for
[`sass-resources-loader`](https://github.com/shakacode/sass-resources-loader)

## Usage

Install with:

```bash
npm install --save-dev vue-cli-plugin-sass-resources
# or
yarn add --dev vue-cli-plugin-sass-resources

# or use `vue-cli` inside already created project
vue add sass-resources
```

Configure it by using `vue.config.js`:

```js
pluginOptions: {
  sassResources: {
    resources: './path/to/resource.scss';
  }
}
```

## Plugin options

#### `resources`

Path(s) to resource files

- type: `String|Array<String>`
- required

#### `scope`

Plugin scope

- type: `Array`
- default: `['scss', 'sass']`
- optional
