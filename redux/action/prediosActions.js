// Actions types
export const PREDIOS_LIST_REQUEST = 'PREDIOS_LIST_REQUEST';

// Action creators
export const listPredios = () => {
  let data = {
    nombre: 'redux',
    precio: 'hola',
    departamento: 'hola',
    municipio: 'hola',
    propietario: 'hola',
    construcciones: 'hola',
    terreno: 'hola',
  };

  return {
    type: PREDIOS_LIST_REQUEST,
    payload: data,
  };
};
