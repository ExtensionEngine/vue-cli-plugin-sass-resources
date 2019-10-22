'use strict';

module.exports = (api, { pluginOptions }) => {
  const { scope = ['scss', 'sass'], resources } = pluginOptions.sassResources;
  if (!resources) {
    throw new Error('Missing required parameter: "resources"');
  }
  api.chainWebpack(config => {
    scope.forEach(rule => {
      const oneOfsMap = config.module.rule(rule).oneOfs.store;
      oneOfsMap.forEach(item => {
        item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({ resources });
      });
    });
  });
};
