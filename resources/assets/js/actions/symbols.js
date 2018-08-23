import {
  SYMBOLS_API,
  SYMBOLS_LOGO_API,
  GET_RANDOM
} from 'constants/symbols'
import {get,del,post} from './requests'
export const getRandom = () => {
  return(dispatch) => {
    return dispatch(getSymbols({name: 'random'})).then(
      (e)=>{
        return e[0]
      }
    )
  }
}
export const removeSymbol = (id) => ((dispatch) => {
    return del(SYMBOLS_API+id)
})

export const getSymbols = (filter) => ((dispatch) => {
  let url = SYMBOLS_API
  if (filter && filter.name) {
    url += filter.name
    delete filter.name
  }
  return get(url, filter).then((e) => {
    e.map((symbol) =>(symbol.ohlc)?symbol.ohlc = symbol.ohlc.map((tick) => {
      return {
      ...tick,
      time: new Date(tick.date*1000),
      close: parseFloat(tick.close)
    }}):symbol)
    return e;
  })
})
export const findProviders = (name) => ((dispatch) => {
  return get(SYMBOLS_API+'providers/'+name)

})
export const searchLogo = (name) => ((dispatch) => {
  return get(SYMBOLS_LOGO_API+'search/'+name)
})

export const addSymbol = (form) => ((dispatch) => {
  return post(SYMBOLS_API,form)
})

export const editSymbol = (id,form) => ((dispatch) => {
  return post(SYMBOLS_API+id,form)
})
