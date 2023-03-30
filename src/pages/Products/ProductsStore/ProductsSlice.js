import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    products: [],
    selectedProduct:null
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const newProduct = {
                ...action.payload,
                id: uuidv4(),
            };
            state.products.push(newProduct);
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        updateProduct: (state, action) => {
            const productIndex = state.products.findIndex(
                (product) => product.id === action.payload.id
            );

            if (productIndex !== -1) {
                state.products[productIndex] = action.payload;
            }
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(
                (product) => product.id !== action.payload
            );
        },
    },
});

export const { addProduct, updateProduct, deleteProduct,setSelectedProduct,clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
