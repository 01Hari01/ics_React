import { useState, useEffect } from "react";
import {Box  } from "@mui/material";
import SuppliersTable from "./Suppliers";
import { deleteSupplier, getSuppliers, postSuppliers } from "../../utils/api";
import CustomAppbar from "../Styles/CustomAppbar";

function SuppliersPage() {
    const [suppliers, setSuppliers] = useState([]);


    useEffect(() => {
        fetchSuppliers();
    }, []);

    async function fetchSuppliers() {
        const data = await getSuppliers();
        setSuppliers(data);
        console.log("inside fetchSupp", data);
    }

    async function handleAdd(newSupplierData) {
        const data = await postSuppliers(newSupplierData);
        setSuppliers([...suppliers, data]);
    }

    async function handleDelete(id) {
        await deleteSupplier(id);
        fetchSuppliers();
    }

    return (
        <>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}></Box>
                <CustomAppbar/>
            <SuppliersTable suppliers={suppliers} onDelete={handleDelete} onAdd={handleAdd} />
        </>

    );
}

export default SuppliersPage;
