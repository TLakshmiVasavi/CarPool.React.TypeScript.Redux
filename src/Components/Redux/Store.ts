import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {RootState} from './rootReducer'
import rootReducer from './rootReducer'


export default function configureStore() {

  const store = createStore<RootState>(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
  );

  return store;
}
