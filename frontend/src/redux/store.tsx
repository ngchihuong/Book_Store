import { configureStore } from '@reduxjs/toolkit'
import productReducer from "./slice/cartSlice";


export const store = configureStore({
    reducer: {
        cart: productReducer
    },
})
// Kiểu dữ liệu của RootState và AppDispatch cho TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;