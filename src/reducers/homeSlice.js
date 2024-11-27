import { createSlice } from '@reduxjs/toolkit'

const homeState = {
  roundOneWay: 'roundTrip',
  travelClass: 'ECONOMY^Economy',
  flightClass: 'ECONOMY',
  flightType: 'direct',
  noOfPeople: 1,
  adults: 1,
  children: 0,
  infants: 0,
  date: {
    startDate: '',
    endDate: ''
  }
};
export const homeSlice = createSlice({
  name: 'home',
  initialState: homeState,
  reducers: {
    updateFunc: (state, action) => {
      state[action.payload.keyName] = action.payload.value;
    },
    dateFunc: (state, action) => {
      state.date.startDate = action.payload.startDate
      state.date.endDate = action.payload.endDate
    },
    dateResetFunc: (state, action) => {
      state.date.startDate = ''
      state.date.endDate = ''
    },
    resetHomeFunc: (state, action) => {
      return homeState
    }
  }
})

// Action creators are generated for each case reducer function
export const { 
  updateFunc,
  dateFunc,
  dateResetFunc,
  resetHomeFunc
 } = homeSlice.actions

export default homeSlice.reducer