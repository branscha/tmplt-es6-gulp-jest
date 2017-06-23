# ES6 AMD module (using Gulp/Browserify/Babelify and Jest)
## Goal

Build an ES6 module that can be consumed by ES5 applications.

 * It should be a AMD or UMD module.
 * It should be fully testable with unit tests.

Specifics

 * Browserify is used to collect the multiple source scripts into single output script. It is very useful if the sources are split into multiple modules.
 * It is browserify who invokes bable, browserify is the driver (because it is a source tree walker).
 * Minification.

Remarks

 * You can run 'jest' from the command line to run the tests outside of gulp.
 * gulp dist: builds the dist output.
 * gulp jest: runs jest from within gulp.

The package can be used like this. Note that the require explicitly needs to use the .default to get the default export of the es6 package.

        var pkg = require('package-name').default;
        pkg.do-something();

## References

 * https://stackoverflow.com/questions/29738381/how-to-publish-a-module-written-in-es6-to-npm

## Notes
### Things to install

Gulp

    npm install -g gulp-cli

Jest. Note that the Gulp plugin also wants the CLI to be installed locally, it is not an error that it occurs in the development dependencies.

    npm install -g jest-cli

### Babel

 * Configuration is in .babelrc. The configuration is read by both gulp tasks and jest.

### Jest

 * Jest does not understand AMD modules, that is why in 'test' mode the AMD module generation is not present.

### Other

My first take was to first transpile src and tst to some directory and then run a test runner. This proves very difficult to do, the test runners want to call the transpiler themselves, which is a strange dependency. At this point in time thoug, it is better to follow this way of working than to fight against it, you will always loose. So let the test runner run Babel himself if it is configured. 

Babel has a central configuration file .babelrc which is accessed by the tools. This is also a recurring pattern in JavaScript tools. But the tests sometimes need other configuration than the production code. How do this? There is a feature in babel (the env feature) that lets you set an environment variable to select different settings in the .babelrc. See the BABEL_ENV or NODE_ENV environment variables.



Babel transpilation can be configured by including plugins. Each plugin is responsible for transpiling a specific part of the source code. If you want to generate AMD, UMD, SystemJS modules, just include the correct plugin.
