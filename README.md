<p align="center">
  <a href="#">
    <img width="150" src="media/logo.svg">
  </a>
</p>

# vue-cli-plugin-sass-resources

Vue CLI plugin for [`sass-resources-loader`](https://github.com/shakacode/sass-resources-loader)

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

#### scope

Plugin scope

- type: `Array`
- default: `['scss', 'sass']`
- optional

#### resources

Path(s) to resource files

- type: `String|Array<String>`
- required
