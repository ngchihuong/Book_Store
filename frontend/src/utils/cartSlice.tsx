import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    title: string;
    price: number;
    stock: number;
    imageUrls: string[];
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingProduct = state.items.findIndex(item => item.id === action.payload.id);
            if (existingProduct === -1) {
                state.items.push({...action.payload, stock: 1})
            } else {
                state.items[existingProduct].stock != 1;
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const product = state.items.find(item => item.id === action.payload.id);
            if (product) {
                product.stock = action.payload.quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
