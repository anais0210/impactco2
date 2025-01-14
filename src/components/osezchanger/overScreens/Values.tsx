import GhostButton from 'components/base/GhostButton'
import { OverScreenInfo } from '../../base/OverScreen'
import Hypotesis from './Hypotesis'
import Integration from './Integration'
import Share from './Share'
import { OverScreenOsezChanger } from './Type'

export const overScreenOsezChangerValues: Record<OverScreenOsezChanger, OverScreenInfo> = {
  hypothesis: {
    title: 'hypothesis',
    children: <Hypotesis />,
    cancel: (onClose) => (
      <GhostButton colored icon='arrow-left' onClick={onClose} size='sm'>
        Revenir au challenge
      </GhostButton>
    ),
  },
  share: {
    title: 'share-challenge',
    children: <Share />,
  },
  integration: {
    title: 'integrate-challenge',
    children: <Integration />,
  },
}
