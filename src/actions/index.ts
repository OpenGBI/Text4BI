import { SET_VALUE } from './types';

export const setValue = (value: string) => ({
  type: SET_VALUE,
  payload: value
});
