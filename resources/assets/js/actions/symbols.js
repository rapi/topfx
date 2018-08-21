import {SYMBOLS_API, GET_RANDOM} from 'constants/symbols'
import {get,del} from './requests'
export const getRandom = () => {
  return(dispatch) => {
    return dispatch(getSymbols({name: 'random'})).then((e) => e[0])
  }
}
export const removeSymbol = (id) => ((dispatch) => {
    return del(SYMBOLS_API+id)
})
export const getSymbols = (filter) => ((dispatch) => {
  let url = SYMBOLS_API
  if (filter && filter.name) {
    url +=  filter.name
    delete filter.name
  }
  else
    filter=false
  return get(url, filter);
})
