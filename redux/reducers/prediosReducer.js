import { PREDIOS_LIST_REQUEST } from '../action/prediosActions';

export const productListReducer = (state = { predios: [] }, action) => {
  switch (action.type) {
    case PREDIOS_LIST_REQUEST:
      return { predios: action.payload };
    default:
      return state;
  }
};
