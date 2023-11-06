import { formatName } from 'utils/formatters'

describe('formatName', () => {
  test("transforme les s entre crochet par un simple s, par ex 'les' devient 'le'", () => {
    let res = formatName('le[s]')
    expect(res).toEqual('le')
  })
  test("transforme les x entre crochet par un simple x, par ex 'cadeaux' devient 'cadeau'", () => {
    let res = formatName('cadeau[x]')
    expect(res).toEqual('cadeau')
  })
  test('au singulier, le[s] cadeau[x] devient le cadeau', () => {
    let res = formatName('le[s] cadeau[x]')
    expect(res).toEqual('le cadeau')
  })
  test('au pluriel, le[s] cadeau[x] devient les cadeaux', () => {
    let res = formatName('le[s] cadeau[x]', 2)
    expect(res).toEqual('les cadeaux')
  })
  test('tous les [s] et [x] sont remplacés, même si il y en a plusieurs', () => {
    let res = formatName('le[s] cadeau[x] de[s] chou[x]', 2)
    expect(res).toEqual('les cadeaux des choux')
  })
  test('le résultat peut éventuellement garder ses majuscules originales', () => {
    let res = formatName('Le[s] Cadeau[x] De[s] Chou[x]', 2, true)
    expect(res).toEqual('Les Cadeaux Des Choux')
  })
  test('le résultat perd ses majuscules, par défaut', () => {
    let res = formatName('Le[s] Cadeau[x] De[s] Chou[x]', 2)
    expect(res).toEqual('les cadeaux des choux')
  })
})
