import {styled} from "@mui/material/styles";
import {Button, Table, TableCell} from "@mui/material";

export const StyledTableCell = styled(TableCell)`
    && {
        font-weight: bold;
        background-color: grey;
        border-bottom: 1px solid #ddd;
    }
`;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

export const StyledAppBar = styled('div')(({ theme }) => ({
    top: 0,
    left: 0,
    width: '100%',
    position: 'sticky',
    backdropFilter: 'saturate(180%) blur(20px)',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('lg')]: {
        height: APPBAR_DESKTOP,
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down('lg')]: {
        height: APPBAR_MOBILE,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));



export const StyledTable = styled(Table)({
    maxWidth: 960,
    margin: '0 auto',
    '& .MuiTableCell-root': {
        borderBottom: 'none',
    },
    '& th': {
        fontWeight: 'bold',
        backgroundColor: '#f3f3f3',
    },
    '& td': {
        borderBottom: '1px solid #f3f3f3',
        padding: '12px',
    },
});



export const StyledButton = styled(Button)({
    backgroundColor: '#f44336',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#d32f2f',
    },
});
