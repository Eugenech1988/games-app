import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Game, Store, Creator } from '@/shared/types';

interface IInitialState {
  games: Game[];
  stores: Store[];
  creators: Creator[];
}

const initialState: IInitialState = {
  games: [],
  creators: [],
  stores: []
}

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    addGames: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload
    },
    addStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload
    },
    addCreators: (state, action: PayloadAction<Creator[]>) => {
      state.creators = action.payload
    }
  }
})

export const { addGames, addStores, addCreators } = contentSlice.actions;

export default contentSlice.reducer;