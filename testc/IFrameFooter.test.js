import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { StyleProvider } from 'components/providers/StyleProvider'
import IframeFooter from 'components/layout/iframe/IframeFooter'

describe('IframeFooter', () => {
  // See https://webtips.dev/how-to-mock-processenv-in-jest
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, websiteurl: 'example.com' }
  })

  afterEach(() => {
    process.env = env
  })

  it('renders a Footer specific to the iframe', () => {
    render(
      <StyleProvider>
        <IframeFooter />
      </StyleProvider>
    )
    // check if all components are rendered
    expect(screen.getByTestId('magic-link')).toHaveAttribute('href', 'https://example.com')
  })
})