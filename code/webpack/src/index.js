const Compiler = require('./Compiler');
const options = require('../test/hpack.config');

const compiler = new Compiler(options);

compiler.run()
