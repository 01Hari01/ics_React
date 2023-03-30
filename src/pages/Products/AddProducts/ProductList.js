import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Pagination,
} from "@mui/material";
import {StyledTableCell} from "../../suppliers/TableStyles";

const ProductList = ({ filter,addProduct,deleteProduct,setSelectedProduct }) => {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filteredProducts = filter
        ? products.filter((product) => product.category === filter)
        : products;

    const handleEditProduct = (product) => {
        dispatch(setSelectedProduct(product));
    };

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, filteredProducts.length - (page - 1) * rowsPerPage);

    return (
        <Box sx={{width: "100%"}}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="product table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Expiry Date</StyledTableCell>
                            <StyledTableCell>On Special</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts
                            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                            .map((product) => (
                                <TableRow
                                    key={product.id}
                                    style={{
                                        backgroundColor: product.onSpecial ? "rgba(255, 255, 0, 0.2)" : "transparent",
                                    }}
                                >
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>
                                        {product.canExpire ? product.expiryDate : "N/A"}
                                    </TableCell>
                                    <TableCell>{product.onSpecial ? "Yes" : "No"}</TableCell>
                                    <TableCell>
                                        <Box display="flex" justifyContent="flex-start">
                                            <Button
                                                onClick={() => handleEditProduct(product)}
                                                variant="contained"
                                                style={{marginRight: 8}}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleDeleteProduct(product.id)}
                                                color="error"
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{display: "flex", justifyContent: "flex-end", mt: 2}}>
                <Pagination
                    count={Math.ceil(filteredProducts.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}
export default ProductList