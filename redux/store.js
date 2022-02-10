import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createStore } from 'redux';
import { productListReducer } from './reducers/prediosReducer';
// import data from './pages/API/predios.json';

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
  } else {
    return productListReducer(state, action);
  }
};

// create store
// el initialState por default = startState
const store = (initialState = startState) => {
  return createStore(reducer, initialState);
};

export const wrapper = createWrapper(store);
