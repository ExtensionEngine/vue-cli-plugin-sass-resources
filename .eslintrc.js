'use strict';

module.exports = {
  root: true,
  extends: '@extensionengine',
  root: true,
  extends: '@extensionengine',
  overrides: [{
    files: ['**/*.spec.js'],
    plugins: ['jest'],
    env: {
      jest: true
    }
  }]
};
