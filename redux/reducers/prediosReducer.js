import { PREDIOS_LIST_REQUEST } from '../action/prediosActions';
import { HYDRATE } from 'next-redux-wrapper';

export const productListReducer = (state = { predios: [] }, action) => {
  switch (action.type) {
    // case HYDRATE:
    //   return { ...state };
    case PREDIOS_LIST_REQUEST:
      return { ...state, predios: action.payload };
    default:
      return state;
  }
};
