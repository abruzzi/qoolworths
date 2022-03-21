import { rest } from 'msw'

let count = 0;

export const handlers = [
  rest.get('https://qoolworths.com.au/orders/:orderId', (req, res, ctx) => {
    const orderId = req.params['orderId']
    if(count < 3) {
      count = count + 1
      return res(ctx.json({
        order: orderId,
        status: 'pending'
      }))
    }

    return res(ctx.json({
      order: orderId,
      status: 'ready'
    }))
  }),

  rest.post('https://qoolworths.com.au/orders/:orderId', (req, res, ctx) => {
    const orderId = req.params['orderId']

    return res(ctx.json({
      order: orderId,
      notified: true
    }))
  })
]