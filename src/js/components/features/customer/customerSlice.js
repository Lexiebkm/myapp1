import { createSlice } from '@reduxjs/toolkit'

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    value: "Mobile Oil",
  },
  reducers: {
    changeName: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const {changeName} = customerSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.customer.value)`
export const selectCustomer = (state) => state.customer.value

export default customerSlice.reducer
