'use strict';

const { createProject } = require('./utils');
const { defaultPreset } = require('@vue/cli/lib/options');
const fs = require('fs-extra');
const path = require('path');
const pkg = require('../package.json');

const [projectName] = process.argv.slice(2);
const projectPath = path.resolve(__dirname, projectName);
const rootDir = path.dirname(__dirname, '..');

const preset = {
  ...defaultPreset,
  plugins: {
    ...defaultPreset.plugins,
    [pkg.name]: {
      version: `file:${rootDir}`
    }
  }
};

(async function () {
  console.error(`\nRemoving directory: ${projectPath}`);
  await fs.remove(path.resolve(__dirname, projectName));
  console.error('\nInitializing vue-cli project...');
  const project = await createProject(projectName, preset, __dirname, false);
  console.error('\nInstalling `sass-loader` & `sass`...');
  return project.run('npm', ['install', '-D', 'sass-loader', 'sass']);
}());
