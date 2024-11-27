import { createSlice } from '@reduxjs/toolkit'

const vendorsState = {
  PilgrimageBookingNew: {},
  PackageManagementNew: {},
};

export const vendorsSlice = createSlice({
  name: 'vendors',
  initialState: vendorsState,
  reducers: {
    updateVendorsFunc: (state, action) => {
      const { componentName, keyName, value } = action.payload;
      if (!state[componentName]) state[componentName] = {};
      state[componentName][keyName] = value;
    },
    resetVendorsComponentFunc: (state, action) => {
      const { componentName } = action.payload;
      state[componentName] = vendorsState[componentName];
    },
    resetVendorsFunc: (state, action) => {
      return vendorsState
    }
  }
})

// Action creators are generated for each case reducer function
export const { 
  updateVendorsFunc,
  resetVendorsComponentFunc,
  resetVendorsFunc
 } = vendorsSlice.actions

export default vendorsSlice.reducer