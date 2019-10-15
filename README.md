# vue-cli-plugin-sass-resources 
Vue CLI plugin for [`sass-resources-loader`](https://github.com/shakacode/sass-resources-loader)

## Usage
Install with: 
```bash
npm install --save-dev @extensionengine/vue-cli-plugin-sass-resources 
# or
yarn add --dev @extensionengine/vue-cli-plugin-sass-resources 
```
To  `vue.config.js` add
```js
  pluginOptions: {
    sassResources: {
      resources: './path/to/resource.scss'
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

