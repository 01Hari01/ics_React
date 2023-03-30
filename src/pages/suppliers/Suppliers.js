import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    TableBody,
    TableCell,
    Container,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    InputAdornment,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import { StyledButton, StyledTable, StyledTableCell } from "./TableStyles";
import PhoneList from "./PhoneNumbers";

export default function SuppliersTable({ suppliers, onDelete, onAdd }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState([""]);
    const [searchTerm, setSearchTerm] = useState("");

    //handling pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        const newSupplierData = {
            name,
            phone_numbers: phoneNumbers,
            date_created: new Date().toISOString(),
        };
        onAdd(newSupplierData);
        setOpen(false);
        setName("");
        setPhoneNumbers([""]);
    };

    const handleDelete = (id) => {
        onDelete(id);
    };

    const handleAddPhone = () => {
        setPhoneNumbers([...phoneNumbers, ""]);
    };

    const handlePhoneChange = (index, value) => {
        const newPhoneNumbers = [...phoneNumbers];
        newPhoneNumbers[index] = value;
        setPhoneNumbers(newPhoneNumbers);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Container style={{display: "flex", alignItems: "center"}}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    style={{marginRight: "10px"}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search/>
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleSearch}
                />
                <Button
                    variant="contained"
                    startIcon={<Add/>}
                    onClick={handleClickOpen}
                >
                    Create
                </Button>
            </Container><br/>
            <TableContainer component={Paper}>
                <StyledTable
                    sx={{minWidth: 650}}
                    aria-label="suppliers table"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">
                                Phone Number(s)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Date Created
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Actions
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSuppliers
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((supplier) => (
                                <TableRow key={supplier.id}>
                                    <TableCell align="right">{supplier.id}</TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                    >
                                        {supplier.supplier.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <PhoneList
                                            phoneNumbers={
                                                supplier.supplier.phone_numbers
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {supplier.supplier.date_created}
                                    </TableCell>
                                    <TableCell align="right">
                                        <StyledButton
                                            onClick={() =>
                                                handleDelete(supplier.id)
                                            }
                                        >
                                            Delete
                                        </StyledButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={filteredSuppliers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new supplier</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {phoneNumbers &&
                        phoneNumbers.map((phoneNumber, index) => (
                            <TextField
                                key={index}
                                margin="dense"
                                label={`Phone_Number ${index + 1}`}
                                fullWidth
                                value={phoneNumber}
                                onChange={(e) =>
                                    handlePhoneChange(index, e.target.value)
                                }
                            />
                        ))}
                    <Button sx={{mt: 2}} variant="contained" onClick={handleAddPhone}>
                        Add Phone Number
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleAdd}
                        disabled={!name || phoneNumbers.some((num) => !num)}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

