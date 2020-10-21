// 实现简版webpack
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const { transformFromAstSync } = require('@babel/core');

const Parser = {
    getAst(filepath = '') {
        const content = fs.readFileSync(
            path.extname(filepath) ? filepath : `${filepath}.js`,
            'utf-8'
        );
        return parser.parse(content, {
            sourceType: 'module',
        });
    },
    getDependecies(ast, filename) {
        const depts = {};
        traverse(ast, {
            ImportDeclaration({ node }) {
                const toImportFile = node.source.value;
                const dirname = path.dirname(filename);
                const filepath = path.join(dirname, toImportFile);
                depts[toImportFile] = filepath;
            },
        });
        return depts;
    },
    getCode(ast) {
        const { code } = transformFromAstSync(ast, null, {
            presets: ['@babel/preset-env'],
        });
        return code;
    },
};

module.exports = Parser;
