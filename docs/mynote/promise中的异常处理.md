### promise中的异常是如何处理的
如果链式调用中异常发生了，是会中断后面的链式调用直接抛出异常吗？
是的。

Promise在执行过程中，本身自带了try..catch的错误处理，当出错时，会将错误抛给reject函数，所以直接throw new Error，会被Promise的catch所捕获。

### 几点注意事项
- promise中抛出的错误reject不能被全局的onerror捕获，只能被自带的catch捕获到；
- 如果想被全局的onerror捕获，可以在promise中用setTimeout来抛出异常；
- try-catch用于捕获异常，这里的异常是指同步函数的异常，如果 try 里面的异步方法出现了异常，此时catch 是无法捕获到异常；
- 在 promise 中使用 catch 可以非常方便的捕获到异步 error ，没有写 catch 的 Promise 中抛出的错误无法被 onerror 捕获，但可以在全局增加一个对 unhandledrejection 的监听，用来全局监听 Uncaught Promise Error。