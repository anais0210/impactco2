import React from 'react'

import SmartphoneGeneral from './SmartphoneGeneral'
import SmartphoneCategory from './SmartphoneCategory'
import Smartphone from './Smartphone'

import Boeuf from './Boeuf'
import PoissonGras from './PoissonGras'
import PoissonBlanc from './PoissonBlanc'
import Vegetalien from './Vegetalien'

import Voiture from './Voiture'

const visualizations = {
  smartphone: [<SmartphoneGeneral />, <SmartphoneCategory />, <Smartphone />],
  ordinateurportable: [<SmartphoneCategory />],
  television: [<SmartphoneCategory />],
  repasvegetalien: [<Vegetalien />],
  repasvegetarien: [<Boeuf />],
  repasavecduboeuf: [<Boeuf />, <SmartphoneGeneral />],
  repasavecdupoulet: [<Boeuf />],
  repasavecdupoissongras: [<PoissonGras />],
  repasavecdupoissonblanc: [<PoissonBlanc />],
  voiturethermique: [<Voiture />],
  busthermique: [<Voiture />],
  tgv: [<Voiture />],
}

export default visualizations
