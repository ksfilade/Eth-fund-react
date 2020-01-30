import { createStore, applyMiddleware } from 'redux'
import { persistStore} from 'redux-persist'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './root-reducer'
import productSaga from './fundrisers/fundrisers.saga'
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(productSaga)
export const persistor = persistStore(store);

export default { store, persistStore };