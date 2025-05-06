import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/login/authSlice';
import addproducrReducer from '../slices/product/addSlice'
import viewproductReducer from '../slices/product/viewSlice'
import viewCategoryReducer from '../slices/product/viewCategorySlice'
import addCategoryReducer from '../slices/product/addCategorySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        addProduct: addproducrReducer,
        viewProduct: viewproductReducer,
        viewCategory: viewCategoryReducer,
        addCategory: addCategoryReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
