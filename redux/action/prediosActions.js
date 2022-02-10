// Actions types
export const PREDIOS_LIST_REQUEST = 'PREDIOS_LIST_REQUEST';
import axios from 'axios';

// Action creators
export const listPredios = () => async (dispatch) => {
  // let data = [
  //   {
  //     nombre: 'redux',
  //     precio: 'hola',
  //     departamento: 'hola',
  //     municipio: 'hola',
  //     propietario: 'hola',
  //     construcciones: 'hola',
  //     terreno: 'hola',
  //   },
  // ];

  // console.log(data);

  try {
    const { data } = await axios.get('http://localhost:3000/api/predios/');
    // const data = await response.json;
    // console.log(response);

    dispatch({
      type: PREDIOS_LIST_REQUEST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
