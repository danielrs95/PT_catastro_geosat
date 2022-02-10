import {
  PREDIOS_LIST_FAIL,
  PREDIOS_LIST_REQUEST,
  PREDIOS_LIST_SUCCESS,
} from '../action/prediosActions';

export const prediosListReducer = (state = {}, action) => {
  switch (action.type) {
    case PREDIOS_LIST_REQUEST:
      return { predios: [] };

    case PREDIOS_LIST_SUCCESS:
      return { predios: action.payload };

    case PREDIOS_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
