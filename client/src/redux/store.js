import { configureStore } from '@reduxjs/toolkit'

import {
  persistStore,
  persistReducer,
  authPersistConfig,
  middleware,
} from './persistConfig'

import authReducer from './auth/auth-reducer'
import tableDataReducer from './table-data/table-data-reducer'
import filterReducer from './filter/filter-reducer'

const persistedReducer = persistReducer(authPersistConfig, authReducer)
const reducer = {
  auth: persistedReducer,
  tableData: tableDataReducer,
  filter: filterReducer,
}

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV === 'development',
})

const persistor = persistStore(store)

export { store, persistor }
