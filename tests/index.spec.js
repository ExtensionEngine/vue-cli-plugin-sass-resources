'use strict';

const dedent = require('dedent');
const fs = require('fs-extra');
const path = require('path');
const { projectFromDir } = require('./utils');

jest.setTimeout(50000);

const PROJECT_DIR = path.resolve(__dirname, './sass-resources-test-project');

const project = projectFromDir(PROJECT_DIR);
const scssResourcesPath = path.resolve(__dirname, './fixtures/common.scss');
const sassResourcesPath = path.resolve(__dirname, './fixtures/common.sass');

describe('options', () => {
  it('should require `resources` option', async () => {
    await writeOptions(project, {});
    const cmd = await build(project);
    expect(cmd.exitCode).toEqual(1);
    expect(cmd.stderr).toContain('Missing required parameter: "resources"');
  });
});

describe('build', () => {
  let appContent;
  let mainContent;
  const expectedCss = '.test{color:#28a745}';

  beforeAll(async () => {
    [appContent, mainContent] = await Promise.all([
      project.read('src/App.vue'),
      project.read('src/main.js')
    ]);
  });

  afterAll(async () => fs.remove(PROJECT_DIR));

  test('injects scss resources', async () => {
    await writeOptions(project, { resources: scssResourcesPath });
    await project.write('src/App.vue', appContent.replace('</script>', () => dedent`
      </script>

      <style lang="scss">
      .test {
        @extend %text-success;
      }
      </style>
    `));
    const cmd = await build(project, true);
    expect(cmd.exitCode).toEqual(0);
    const cssContent = await readGeneratedCss(project);
    expect(cssContent).toContain(expectedCss);
  });

  test('injects multiple scss resources', async () => {
    await writeOptions(project, { resources: [scssResourcesPath] });
    await project.write('src/index.scss', dedent`
    .test {
      @extend %text-success;
    }
    `);
    await project.write('src/App.vue', appContent);
    await project.write('src/main.js', mainContent.replace("import Vue from 'vue'", () => dedent`
      import './index.scss';
      import Vue from 'vue'
    `));
    const cmd = await build(project, true);
    expect(cmd.exitCode).toEqual(0);
    const cssContent = await readGeneratedCss(project);
    expect(cssContent).toContain(expectedCss);
  });

  test('injects sass resources', async () => {
    await writeOptions(project, { resources: sassResourcesPath });
    await project.write('src/index.sass', dedent`
      .test
        @extend %text-success
    `);
    await project.write('src/App.vue', appContent);
    await project.write('src/main.js', mainContent.replace("import Vue from 'vue'", () => dedent`
      import './index.sass';
      import Vue from 'vue'
    `));
    const cmd = await build(project, true);
    expect(cmd.exitCode).toEqual(0);
    const cssContent = await readGeneratedCss(project);
    expect(cssContent).toContain(expectedCss);
  });

  test('injects multiple sass resources', async () => {
    await writeOptions(project, { resources: [sassResourcesPath] });
    await project.write('src/App.vue', appContent.replace('</script>', () => dedent`
      </script>

      <style lang="sass">
      .test
        @extend %text-success
      </style>
    `));
    await project.write('src/main.js', mainContent);
    const cmd = await build(project, true);
    expect(cmd.exitCode).toEqual(0);
    const cssContent = await readGeneratedCss(project);
    expect(cssContent).toContain(expectedCss);
  });
});

function writeOptions(project, options = {}) {
  return project.write('vue.config.js', dedent`
    module.exports = {
      pluginOptions: {
        sassResources: ${JSON.stringify(options)}
      }
    };
  `);
}

async function build(project, report = false) {
  const args = ['build', report && '--report-json'].filter(Boolean);
  const env = { NODE_ENV: 'production' };
  const cmd = await project.run('vue-cli-service', args, { env });
  console.log(cmd.stdout);
  console.log(cmd.stderr);
  return cmd;
}

async function readGeneratedCss(project) {
  const report = JSON.parse(await project.read('dist/report.json'));
  const cssPath = report.assetsByChunkName.app.find(it => it.endsWith('.css'));
  return project.read(path.join('dist', cssPath));
}
