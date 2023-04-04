import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import customerReducer from '../features/customer/customerSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    customer: customerReducer
  },
});
