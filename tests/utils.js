'use strict';

const dargs = require('dargs');
const execa = require('execa');
const fs = require('fs-extra');
const path = require('path');
const resolveFrom = require('resolve-from');

module.exports = {
  createProject,
  projectFromDir
};

async function createProject(name, preset, cwd, initGit = true) {
  const command = require.resolve('@vue/cli/bin/vue');
  const options = dargs({
    force: true,
    inlinePreset: JSON.stringify(preset),
    git: initGit
  }, { allowCamelCase: true });
  const projectRoot = path.resolve(cwd, name);
  await execa(command, ['create', name, ...options], { cwd, stdio: 'inherit' });
  return projectFromDir(projectRoot);
}

function projectFromDir(projectRoot) {
  return {
    has: file => fs.existsSync(path.resolve(projectRoot, file)),
    read: file => fs.readFile(path.resolve(projectRoot, file), 'utf-8'),
    write: (file, content) => {
      const targetPath = path.resolve(projectRoot, file);
      const dir = path.dirname(targetPath);
      return fs.ensureDir(dir).then(() => fs.writeFile(targetPath, content));
    },
    remove: file => fs.remove(path.resolve(projectRoot, file)),
    run: (command, args, options) => {
      if (command === 'vue-cli-service') {
        command = resolveFrom(projectRoot, '@vue/cli-service/bin/vue-cli-service');
      }
      return execa(command, args, { ...options, cwd: projectRoot, reject: false });
    }
  };
}
