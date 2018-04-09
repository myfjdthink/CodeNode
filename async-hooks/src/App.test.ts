import {app} from './App'
import * as supertest from 'supertest'

describe('koa async hooks test', async function () {
  const server = app.listen(3008)
  const request = supertest.agent(server)

  it(' test ts log', async () => {
    const querys = []
    for (let i = 0; i < 10; i++) {
      querys.push(request.get('/api/v1/hello').query({requestId: 11111}).expect({msg: 'hello world'}))
    }
    await Promise.all(querys)
  })
})
