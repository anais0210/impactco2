import styled from 'styled-components'
import { useUrl } from 'hooks/useUrl'
import MagicLink from 'components/base/MagicLink'
import { Section2, Section2InnerMargin } from 'components/base/Section2'

const Wrapper = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  height: 3.05rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 1rem 1rem 1rem 0;
`
export default function BreadCrumb3() {
  const { pathname } = useUrl() ?? {}

  return (
    <Section2>
      <Section2InnerMargin>
        <nav aria-label="fil d'ariane">
          <Wrapper>
            <MagicLink to='/'>Accueil</MagicLink>
            {' > '}
            <MagicLink to='/documentation'>Documentation</MagicLink>
            {pathname?.includes('livraison-colis-par-avion') ? (
              <>
                {' > '} <>Livraison d'un colis par avion</>
              </>
            ) : (
              <>
                {' > '} <>Livraison d'un colis</>
              </>
            )}
          </Wrapper>
        </nav>
      </Section2InnerMargin>
    </Section2>
  )
}