// ProductsPage.js
import React from 'react';
import { useSelector } from 'react-redux';
import ProductList from "../AddProducts/ProductList";
import {Container} from "@mui/material";
import CustomAppbar from "../../Styles/CustomAppbar";

const ProductsDisplayPage = () => {
    const products = useSelector((state) => state.products.products);

    return (
        <>
            <CustomAppbar/>
            <Container maxWidth="md">
            <h1>Products</h1>
            <ProductList products={products} />
        </Container>
            </>
    );
};

export default ProductsDisplayPage;
