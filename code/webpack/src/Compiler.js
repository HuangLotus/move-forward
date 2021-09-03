const Parser = require('./Parser');
const fs = require('fs');

class Compiler {
    constructor(options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    // 启动构建
    run() {
        // 入口模块
        const moduleInfo = this.build(this.entry);
        this.modules.push(moduleInfo);

        // 由入口出发递归分析依赖，最终得出APP运转需要的所有模块
        for (let i = 0; i < this.modules.length; i++) {
            const { depts = [] } = this.modules[i];
            for (const dept in depts) {
                this.modules.push(this.build(depts[dept]));
            }
        }

        // 构建依赖图  'filename' -> 依赖
        const deptsGraph = this.modules.reduce(
            (graph, item) => ({
                ...graph,
                [item.filename]: {
                    depts: item.depts,
                    code: item.code,
                },
            }),
            {}
        );

        // 生成最终代码
        this.generate(deptsGraph);
    }
    build(filename) {
        const ast = Parser.getAst(filename);
        const depts = Parser.getDependecies(ast, filename);
        const code = Parser.getCode(ast);
        return {
            ast,
            filename,
            depts,
            code,
        };
    }
    // 实现require 输出bundle
    generate(code) {
        const filePath =
            this.output +
            '/' +
            (this.output.filename ? this.output.filename : 'bundle.js');
        const bundle = `
            ;(function (graph) {
                function require(moduleId) {
                    function localRequire(relativePath) {
                        return require(graph[moduleId].depts[relativePath])
                    }
                    var exports = {}
                    ;(function (require,exports,code) {
                        eval(code)
                    })(localRequire,exports,graph[moduleId].code)
                    return exports
                }
                require('${this.entry}')
            })(${JSON.stringify(code)})
        `;
        fs.writeFileSync(filePath, bundle, {
            flag: 'w',
        });
    }
}

module.exports = Compiler;
