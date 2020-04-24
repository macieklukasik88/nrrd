/**
 * Reducer define how to update the application state
 * Any business logic should be defined in actions
 */

import { REVENUE, DATA_FILTER_CONSTANTS as DFC } from '../../constants'
import CONSTANTS from '../../js/constants'

const types = Object.freeze({
  UPDATE_DATA_FILTER: 'UPDATE_DATA_FILTER',
})

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
  case types.UPDATE_DATA_FILTER: {
    const dataType = payload.dataType || state.dataType
    const dataTypeCache = Object.assign(((state.dataTypesCache && state.dataTypesCache[dataType]) || { ...initialState }), { ...payload })
    const updatedDataTypesCache = Object.assign((state.dataTypesCache || {}), { [dataType]: { ...dataTypeCache } })

    return ({ dataTypesCache: { ...updatedDataTypesCache }, ...dataTypeCache, dataType: dataType })
  }
  default:
    return state
  }
}

const initialState = {
  [DFC.DATA_TYPE]: REVENUE,
  [DFC.OFFSHORE_REGIONS]: 'Off',
  [DFC.COUNTIES]: 'State',
  [DFC.COMMODITY]: CONSTANTS.OIL,
  [DFC.PERIOD]: CONSTANTS.FISCAL_YEAR,
  [DFC.YEAR]: 2019
}

export { initialState, types, reducer }
