import Link from 'next/link'
import styled from 'styled-components'

export const LinkContainer = styled(Link)<{ $color?: 'blue' }>`
  align-items: stretch;
  background-color: white;
  border: 1px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'neutral')}-20);
  border-radius: ${({ $color }) => ($color === 'blue' ? '4px' : '16px')};
  color: var(--neutral-80);
  display: flex;
  text-decoration: none;
  z-index: 2;

  img {
    border-radius: ${({ $color }) => ($color === 'blue' ? '4px 0 0 4px' : '16px 0 0 16px')};
    border-right: 1px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'neutral')}-20);
    height: auto;
    object-fit: cover;
  }

  &:hover {
    border: 1px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'neutral')}-30);
    img {
      border-right: 1px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'neutral')}-30);
    }
  }

  &:focus {
    border: 1px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'neutral')}-40);
    img {
      border-right: 1px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'neutral')}-40);
    }
    outline: 3px solid var(--${({ $color }) => ($color === 'blue' ? 'secondary' : 'neutral')}-40);
    outline-offset: 2px;
  }
`

export const Content = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.75rem;
  text-align: left;
`

export const Text = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.125rem;
`

export const FakeLink = styled.div`
  color: var(--secondary-50);
  font-weight: 500;
`