import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
// import favoritesReducer from './features/favoritesSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        // favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;