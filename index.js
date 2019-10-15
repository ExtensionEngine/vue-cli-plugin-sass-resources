'use strict';

module.exports = (api, { pluginOptions }) => {
  const { scope = ['scss', 'sass'], resources } = pluginOptions.sassResources;
  api.chainWebpack(config => {
    scope.forEach(rule => {
      const oneOfsMap = config.module.rule(rule).oneOfs.store;
      oneOfsMap.forEach(item => {
        item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({ resources })
        .end();
      });
    });
  });
};
