import StackView, {EmptyHeader, EmptyFooter, Header} from "../StackView";
import {render, screen} from "@testing-library/react";

describe('StackView', () => {
  it('renders', () => {
    render(<StackView>content</StackView>)

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('hides header if the flag is set', () => {
    render(<StackView header={<EmptyHeader />}>content</StackView>)
    expect(screen.queryByTestId('header')).not.toBeInTheDocument()
  })

  it('hides footer if the flag is set', () => {
    render(<StackView footer={<EmptyFooter />}>content</StackView>)
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
  })

  it('shows profile link when required', () => {
    render(<StackView header={<Header showProfile />}>content</StackView>)

    expect(screen.queryByTestId('header')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })
})