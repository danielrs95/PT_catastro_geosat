import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  prediosListReducer,
  prediosListReducer2,
} from './reducers/prediosReducer';
import thunkMiddleware from 'redux-thunk';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  prediosList: prediosListReducer,
  prediosList2: prediosListReducer2,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

// create store
// el initialState por default = startState
const makeStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(makeStore, { debug: true });
