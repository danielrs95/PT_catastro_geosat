// Actions types
import axios from 'axios';
// List all predios constants
export const PREDIOS_LIST_REQUEST = 'PREDIOS_LIST_REQUEST';
export const PREDIOS_LIST_SUCCESS = 'PREDIOS_LIST_SUCCESS';
export const PREDIOS_LIST_FAIL = 'PREDIOS_LIST_FAIL';

// List single predio constants
export const PREDIOS_DETAIL_REQUEST = 'PREDIOS_DETAIL_REQUEST';
export const PREDIOS_DETAIL_SUCCESS = 'PREDIOS_DETAIL_SUCCESS';
export const PREDIOS_DETAIL_FAIL = 'PREDIOS_DETAIL_FAIL';

// Action creators
export const listPredios = () => async (dispatch) => {
  try {
    dispatch({ type: PREDIOS_LIST_REQUEST });

    const { data } = await axios.get('http://localhost:3000/api/predios/');
    // console.log(data);

    dispatch({
      type: PREDIOS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PREDIOS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPredioDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PREDIOS_DETAIL_REQUEST });

    const { data } = await axios.get(`http://localhost:3000/api/predios/${id}`);
    dispatch({
      type: PREDIOS_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PREDIOS_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
