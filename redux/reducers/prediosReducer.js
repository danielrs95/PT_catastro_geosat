import {
  PREDIOS_CREATE_FAIL,
  PREDIOS_CREATE_REQUEST,
  PREDIOS_CREATE_SUCCESS,
  PREDIOS_DELETE_FAIL,
  PREDIOS_DELETE_REQUEST,
  PREDIOS_DELETE_SUCCESS,
  PREDIOS_DETAIL_FAIL,
  PREDIOS_DETAIL_REQUEST,
  PREDIOS_DETAIL_SUCCESS,
  PREDIOS_LIST_FAIL,
  PREDIOS_LIST_REQUEST,
  PREDIOS_LIST_SUCCESS,
  PREDIOS_UPDATE_FAIL,
  PREDIOS_UPDATE_REQUEST,
  PREDIOS_UPDATE_SUCCESS,
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

export const predioDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PREDIOS_DETAIL_REQUEST:
      return { ...state };

    case PREDIOS_DETAIL_SUCCESS:
      return { predio: action.payload };

    case PREDIOS_DETAIL_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};

export const predioUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PREDIOS_UPDATE_REQUEST:
      return { ...state };

    case PREDIOS_UPDATE_SUCCESS:
      return { predio: action.payload };

    case PREDIOS_UPDATE_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};

export const predioDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PREDIOS_DELETE_REQUEST:
      return { ...state };

    case PREDIOS_DELETE_SUCCESS:
      return { success: true };

    case PREDIOS_DELETE_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};

export const predioCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PREDIOS_CREATE_REQUEST:
      return { ...state };

    case PREDIOS_CREATE_SUCCESS:
      return { predio: action.payload };

    case PREDIOS_CREATE_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};
