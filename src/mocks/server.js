import {rest} from "msw";
import {setupServer} from 'msw/node'

export const server = setupServer(
  rest.get('https://qoolworths.com.au/orders/:orderId', (req, res, ctx) => {
    const orderId = req.params['orderId']

    return res(ctx.json({
      order: orderId,
      status: 'initialised'
    }))
  })
)