import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { RulesProviderLivraison } from 'components/livraison/RulesProviderLivraison'

export default function Documentation() {
  const router = useRouter()
  const rootDoc = 'livraison'

  const DocumentationLivraison = dynamic(() => import('components/base/DocumentationLivraison'), {
    ssr: false,
  })

  return (
    <>
      <RulesProviderLivraison>
        <DocumentationLivraison slug={router?.query?.slug?.join('/') || rootDoc} />
      </RulesProviderLivraison>
    </>
  )
}