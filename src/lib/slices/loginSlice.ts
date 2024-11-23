import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/shared/types';

type LoginState = {
  id: string;
  payment: number | null;
}



const initialState: LoginState = {
  id: JSON.parse((typeof window !== 'undefined') ? <string>localStorage.getItem('id') : ''),
  payment: JSON.parse((typeof window !== 'undefined') ? <string>localStorage.getItem('payment') : 0)
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<UserProfile>) => {
      state.id = action.payload.id;
      localStorage.setItem('id', action.payload.id);
    },
    addPayment: (state, action: PayloadAction<number>) => {
      state.payment = action.payload;
      localStorage.setItem('payment', action.payload.toString());
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
