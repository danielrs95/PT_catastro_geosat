// Actions types
export const PREDIOS_LIST_REQUEST = 'PREDIOS_LIST_REQUEST';
import axios from 'axios';

// Action creators
export const listPredios = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/predios/');
    // console.log(data);

    dispatch({
      type: PREDIOS_LIST_REQUEST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
