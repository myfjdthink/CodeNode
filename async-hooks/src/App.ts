import * as Koa from 'koa'
import * as async_hooks from 'async_hooks'
import * as tracer from 'tracer'

const logger = tracer.console({
  transport: function (data) {
    const asyncId = async_hooks.executionAsyncId()
    console.log(asyncId, data.output)
  }
})

async_hooks.createHook({}).enable()

const app = new Koa()

app.use(async (ctx, next) => {
  logger.log(1)
  await d1()
  ctx.body = {msg: 'hello world'}
  return
})

async function d1 () {
  logger.log(2)
  await d2()
}

async function d2 () {
  logger.log(3)
  // 使用 bluebird.delay 会导致 asyncId 错乱
  // await bluebird.delay(Math.random() * 50)
  logger.log('hello')
}

export {app}
