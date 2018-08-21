import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';
const middleware = applyMiddleware(thunk);
export default createStore(
  rootReducer,
  compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f)
);
