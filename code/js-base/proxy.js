const target = {}
const handler = {
    get(target, property) {
        if (property in target) {
            return target[property]
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.")
        }
    }
}
const p = new Proxy(target, {})
p.a = 3  // 被转发到代理的操作
console.log('cc',p.c)