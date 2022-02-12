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

// Update predio constants
export const PREDIOS_UPDATE_REQUEST = 'PREDIOS_UPDATE_REQUEST';
export const PREDIOS_UPDATE_SUCCESS = 'PREDIOS_UPDATE_SUCCESS';
export const PREDIOS_UPDATE_FAIL = 'PREDIOS_UPDATE_FAIL';

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

export const updatePredio = (predio) => async (dispatch) => {
  try {
    console.log('Predio from action', predio);
    dispatch({ type: PREDIOS_UPDATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let { id } = predio;

    const { data } = await axios.put(
      `http://localhost:3000/api/predios/${id}`,
      predio,
      config
    );

    dispatch({
      type: PREDIOS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PREDIOS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
