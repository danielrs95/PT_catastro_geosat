import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createStore } from 'redux';
import { productListReducer } from './reducers/prediosReducer';

// initial state
const startState = {
  data: [],
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return productListReducer(state, action);
  }
};

// create store
// el initialState por default = startState
const store = (initialState = startState) => {
  return createStore(reducer, initialState);
};

export const wrapper = createWrapper(store, { debug: true });
