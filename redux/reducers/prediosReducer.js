import { PREDIOS_LIST_REQUEST } from '../action/prediosActions';

export const prediosListReducer = (state = {}, action) => {
  switch (action.type) {
    case PREDIOS_LIST_REQUEST:
      return { predios: action.payload };
    default:
      return state;
  }
};

// export const prediosListReducer2 = (state = {}, action) => {
//   switch (action.type) {
//     case 'TEST':
//       return { predios: action.payload };
//     default:
//       return state;
//   }
// };
