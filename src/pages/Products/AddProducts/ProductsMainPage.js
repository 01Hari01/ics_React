import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {addProduct, deleteProduct, updateProduct,setSelectedProduct} from "../ProductsStore/ProductsSlice";
import CustomAppbar from "../../Styles/CustomAppbar";
import {Container} from "@mui/material";
import ProductForm from "./ProductsForm";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ProductList from "./ProductList";

function ProductMainPage() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const selectedProduct = useSelector((state) => state.products.selectedProduct);
    const [filter, setFilter] = useState('');

    const addProductHandler = (product) => {
        dispatch(addProduct(product));
    };

    const deleteProductHandler = (productId) => {
        dispatch(deleteProduct(productId));
    };

    const updateProductHandler = (product) => {
        dispatch(updateProduct(product));
    };

    const onFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <CustomAppbar/>
            <Container maxWidth="md">
                <h1>Product List</h1>
                <ProductForm
                    addProduct={addProductHandler}
                    updateProduct={updateProductHandler}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />
                <br />
                <FormControl fullWidth>
                    <InputLabel htmlFor="categoryFilter">Filter by category</InputLabel>
                    <Select
                        id="categoryFilter"
                        value={filter}
                        onChange={onFilterChange}
                        label="Filter by category"
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value="vegetables">Vegetables</MenuItem>
                        <MenuItem value="meat">Meat</MenuItem>
                        <MenuItem value="furniture">Furniture</MenuItem>
                        {/* Add more categories here */}
                    </Select>
                </FormControl>
                <ProductList
                    products={products}
                    filter={filter}
                    deleteProduct={deleteProductHandler}
                    setSelectedProduct={setSelectedProduct}
                />
            </Container>
        </>
    );
}
export default ProductMainPage;