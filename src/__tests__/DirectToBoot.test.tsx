import {act, fireEvent, render, screen, waitFor} from '@testing-library/react'
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

  it('enable the button when an order is ready - polling', async () => {
    let count = 0;
    server.use(
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
      })
    )

    render(<DirectToBoot orderId="0444526344" />)
    await waitFor(() => expect(screen.getByTestId('iamhere')).toBeEnabled(), {
      timeout: 5000,
    })
  })

  const mockNotifyStore = () => {
    server.use(
      rest.get('https://qoolworths.com.au/orders/:orderId', (req, res, ctx) => {
        const orderId = req.params['orderId']

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
    )
  }

  const mockNetworkFailure = () => {
    server.use(
      rest.get('https://qoolworths.com.au/orders/:orderId', (req, res, ctx) => {
        const orderId = req.params['orderId']

        return res(ctx.json({
          order: orderId,
          status: 'ready'
        }))
      }),

      rest.post('https://qoolworths.com.au/orders/:orderId', (req, res, ctx) => {
        const orderId = req.params['orderId']

        return res(
          ctx.status(404),
          ctx.json({
            errorMessage: `Order ${orderId} not found`,
          }))
      })
    )
  }

  it('notify the store that the customer is arrived', async () => {
    mockNotifyStore()

    render(<DirectToBoot orderId="0444526344" />)

    const button = screen.getByTestId('iamhere');

    await waitFor(() => expect(button).toBeEnabled(), {
      timeout: 5000,
    })

    act(() => {
      fireEvent.click(button)
    })

    await waitFor(() => expect(screen.queryByTestId('iamhere')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByTestId('store-is-notified')).toBeInTheDocument())
  })

  it('shows the phone number when something went wrong', async () => {
    mockNetworkFailure()

    render(<DirectToBoot orderId="0444526344" />)

    const button = screen.getByTestId('iamhere');

    await waitFor(() => expect(button).toBeEnabled(), {
      timeout: 5000,
    })

    act(() => {
      fireEvent.click(button)
    })

    await waitFor(() => expect(screen.queryByTestId('iamhere')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByTestId('store-is-notified')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByTestId('store-phone-number')).toBeInTheDocument())
  })
})