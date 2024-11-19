import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type LoginState = {
  id: string;
  payment: number | null;
}

const initialState: LoginState = {
  id: JSON.parse(<string>localStorage.getItem('id')) || '',
  payment: JSON.parse(<string>localStorage.getItem('payment')) || 0
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<any>) => {
      state.id = action.payload.id;
      localStorage.setItem('id', action.payload.id);
    },
    addPayment: (state, action: PayloadAction<any>) => {
      state.payment = action.payload;
      localStorage.setItem('payment', action.payload);
    },
    unLogin: (state) => {
      state.id = '';
      state.payment = null;
      localStorage.removeItem('id');
      localStorage.removeItem('payment');
    },
  }
});

export const {setLogin, unLogin, addPayment} = loginSlice.actions;

export default loginSlice.reducer;
