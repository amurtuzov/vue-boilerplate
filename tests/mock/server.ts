import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { successResponseMock } from './response/example'

const exampleHandlers = [
  rest.post(
    `${import.meta.env.VITE_API_BASE_URL}/example/`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(successResponseMock))
    },
  ),
]

export const server = setupServer(...exampleHandlers)
