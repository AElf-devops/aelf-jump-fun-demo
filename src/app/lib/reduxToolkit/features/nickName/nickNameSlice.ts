import { createAppSlice } from '@/app/lib/reduxToolkit/createAppSlice';
import type { AppThunk } from '@/app/lib/reduxToolkit/store';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface INickNameSliceState {
  value: string;
}

const initialState: INickNameSliceState = {
  value: 'aelf',
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const nickNameSlice = createAppSlice({
  name: 'nickName',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    changeName: create.reducer((state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectName: (nickName) => nickName.value,
  },
});

// Action creators are generated for each case reducer function.
export const { changeName } = nickNameSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectName } = nickNameSlice.selectors;

export const getRandomNumberName = (): AppThunk => (dispatch, getState) => {
  const number = Math.ceil(Math.random() * 1000);
  dispatch(changeName(number.toString()));
};
