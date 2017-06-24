# ES6 AMD module (using Gulp and Jest)
## Goal

Build an ES6 module that can be consumed by ES5 applications.

 * It should be a AMD or UMD module.
 * It should be fully testable with unit tests.

Remarks

 * You can run 'jest' from the command line to run the tests outside of gulp.
 * gulp dist: builds the dist output.
 * gulp jest: runs jest from within gulp.

The package can be used like this. 

        var pkg = require('package-name');
        pkg.do-something();

## References
### ES6 package structure

https://stackoverflow.com/questions/29738381/how-to-publish-a-module-written-in-es6-to-npm

### Elegant ES5 imports

https://stackoverflow.com/questions/33505992/babel-6-changes-how-it-exports-default

Explains why you need the babel-plugin-add-module-exports plugin to have elegant ES5 imports.

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
