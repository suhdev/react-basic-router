const { series, parallel,
  src, dest,
  watch } = require('gulp');
const colors = require('colors/safe');
const _ = require('lodash');
const fs = require('fs');
const yargs = require('yargs').argv;
const { resolve, extname,
  basename } = require('path');

const production = yargs.production ? true : false;

function createBuildTaskForFile(file) {

  const baseName = basename(file, extname(file));

  return function (cb) {
    process.env.PROJECT_ROOT = __dirname;
    const { FuseBox, WebIndexPlugin } = require("fuse-box");
    const fuse = FuseBox.init({
      homeDir: "src",
      output: "build/$name.js",
      alias: {
        '~/component-indexof.js': 'component-indexof', // just to avoid some stupid issue with rc-slider,
      },
      plugins: [
        WebIndexPlugin()
      ],
    });
    fuse
      .bundle(`${baseName}.app`)
      .instructions(` > examples/${file}`)
      .hmr()
      .watch();
    fuse.run();
    fuse.dev();
  };
}

function buildJs(cb) {
  if (typeof yargs.input === "undefined" || !yargs.input) {
    log(colors.red('Please provide an input argument i.e. --input appname'));
    log(colors.bgRed(colors.white('input: is the name of the file in src/examples with extension')));
    return cb();
  }
  const input = yargs.input;
  createBuildTaskForFile(input)(cb);
}


const files = fs.readdirSync(resolve(__dirname, './src/examples'));

files.forEach(file => {
  if (/.*?\.tsx?/g.test(file)) {
    const baseName = basename(file, extname(file));
    module.exports['build' + _.capitalize(baseName)] = createBuildTaskForFile(file);
  }
});

exports.buildJs = buildJs;