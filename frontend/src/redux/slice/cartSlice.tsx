import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    id: string;
    title: string;
    categoryId: string;
    authorId: string;
    price: number;
    description: string;
    stock: number;
    imageUrls: string[];
}

// Định nghĩa kiểu dữ liệu cho state
interface CartState {
    CartArr: Product[];
}

// Khởi tạo state ban đầu
const initialState: CartState = {
    CartArr: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Thêm sản phẩm vào giỏ hàng
        addProduct: (state, action: PayloadAction<Product>) => {
            const productIndex = state.CartArr.findIndex(
                (p) => p.id === action.payload.id
            );

            if (productIndex === -1) {
                // Nếu sản phẩm chưa có trong giỏ hàng
                state.CartArr.push({ ...action.payload, stock: 1 });
            } else {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                state.CartArr[productIndex].stock! += 1;
            }
        },
        // Xóa sản phẩm khỏi giỏ hàng
        deleteProduct: (state, action: PayloadAction<{ id: string }>) => {
            state.CartArr = state.CartArr.filter(
                (item) => item.id !== action.payload.id
            );
        },
        updateQuantity: (state, actions: PayloadAction<Product>) => {
            const productIndex = state.CartArr.findIndex((p) => p.id === actions.payload.id);
            if (productIndex !== -1) {
                state.CartArr[productIndex].stock === actions.payload.stock;
            }
        },
        increaseStock: (state, actions: PayloadAction<string>) => {
            const product = state.CartArr.find((item) => item.id === actions.payload);
            if (product) {
                product.stock += 1;
            }
        },
        decreaseStock: (state, actions: PayloadAction<string>) => {
            const product = state.CartArr.find((item) => item.id === actions.payload);
            if (product && product.stock > 1) {
                product.stock -= 1;
            }
        },
        clearCart(state) {
            state.CartArr = []; // Reset cart to an empty array
        },
    },
});

// Xuất các action và reducer
export const { addProduct, deleteProduct, updateQuantity, decreaseStock, increaseStock,clearCart } = cartSlice.actions;
export default cartSlice.reducer;