import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { clearSelectedProduct, updateProduct, addProduct} from "../ProductsStore/ProductsSlice";


const ProductForm = ({
                         selectedProduct,
                     }) => {
    const [product, setProduct] = useState({
        description: '',
        canExpire: false,
        expiryDate: '',
        category: '',
        price: '',
        onSpecial: false,
    });

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        } else {
            resetForm();
        }
    }, [selectedProduct]);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedProduct) {
            dispatch(updateProduct(product));
        } else {
            const newProduct = {
                ...product,
                id: uuidv4(),
            };
            dispatch(addProduct(newProduct));
        }
        handleReset();
    };

    const handleReset = () => {
        resetForm();
        dispatch(clearSelectedProduct());
    };


    const resetForm = () => {
        setProduct({
            description: '',
            canExpire: false,
            expiryDate: '',
            category: '',
            price: '',
            onSpecial: false,
        });
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <h2>{selectedProduct ? 'Edit' : 'Add'} Product</h2>
                </Box>
                <FormGroup>
                    <TextField
                        label="Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="canExpire"
                                checked={product.canExpire}
                                onChange={handleChange}
                            />
                        }
                        label="Can expire?"
                    />
                    {product.canExpire && (
                        <TextField
                            label="Expiry Date"
                            name="expiryDate"
                            type="date"
                            value={product.expiryDate}
                            onChange={handleChange}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: new Date(Date.now()).toISOString().slice(0, 10),
                            }}
                        />
                    )}

                    <FormControl fullWidth required>
                        <InputLabel>Category</InputLabel>
                        <Select name="category" value={product.category} onChange={handleChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="vegetables">Vegetables</MenuItem>
                            <MenuItem value="meat">Meat</MenuItem>
                            <MenuItem value="furniture">Furniture</MenuItem>
                            {/* Add more categories here */}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        inputProps={{ step: '0.01' }}
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="onSpecial"
                                checked={product.onSpecial}
                                onChange={handleChange}
                            />
                        }
                        label="On special?"
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained">
                            {selectedProduct ? 'Update' : 'Add'} Product
                        </Button>
                        <Button
                            type="button"
                            onClick={handleReset}
                            variant="outlined"
                            style={{ marginLeft: 8 }}
                        >
                            Reset
                        </Button>
                    </Box>
                </FormGroup>
            </form>
        </>
    );
};

export default ProductForm;





