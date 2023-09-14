import { SET_VALUE } from '../actions/types';

interface State {
  value: string;
}

const initialState: State = {
  value: ''
};

export const rootReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SET_VALUE:
      return {
        ...state,
        value: action.payload
      };
    default:
      return state;
  }
};
