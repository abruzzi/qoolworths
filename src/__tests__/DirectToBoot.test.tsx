import {render, screen, waitFor} from '@testing-library/react'
import DirectToBoot from '../DirectToBoot'

import {rest} from "msw";
import {server} from '../mocks/server'

describe('DirectToBoot', () => {
  it('has title', () => {
    render(<DirectToBoot orderId="order-id" />)
    expect(screen.getByText('Direct To Boot')).toBeInTheDocument()
  })

  it('has description', () => {
    const desc = "Please click the button when you have arrived, one of our friendly staff will bring your order to you."
    render(<DirectToBoot orderId="order-id" />)
    expect(screen.getByText(desc)).toBeInTheDocument()
  })

  it('disable the button by default when it is not ready', () => {
    render(<DirectToBoot orderId="order-id" />)
    expect(screen.getByTestId('iamhere')).toBeDisabled()
  })

  it('enable the button when an order is ready', async () => {
    server.use(
      rest.get('https://qoolworths.com.au/orders/:orderId', (req, res, ctx) => {
        const orderId = req.params['orderId']

        return res(ctx.json({
          order: orderId,
          status: 'ready'
        }))
      })
    )

    render(<DirectToBoot orderId="0444526344" />)
    await waitFor(() => expect(screen.getByTestId('iamhere')).toBeEnabled(), {
      timeout: 5000,
    });
  })
})