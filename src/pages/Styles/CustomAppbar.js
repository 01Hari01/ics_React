import {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { ShoppingBasket } from "@mui/icons-material";
import {logout} from "../../utils/api";

function CustomAppBar() {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const username = localStorage.getItem("username");
        setUsername(username);
    }, [])
    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("username")
            setUsername("")
            navigate("/login")
        } catch (err) {
            console.error(err)
        }
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuItems = [
        {text: "Home", icon: <HomeIcon/>, link: "/"},
        {text: "Suppliers", icon: <InfoIcon/>, link: "/suppliers"},
        {text: "Add Products", icon: <ShoppingBasket/>, link: "/addproducts"},
        {text: "Products", icon: <InfoIcon/>, link: "/products"},
    ];

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        ICS
                    </Typography>
                    <Box sx={{display: {xs: "flex", md: "none"}}}>
                        <IconButton
                            size="large"
                            aria-label="open menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawerOpen}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
                            <List sx={{width: 250}}>
                                {menuItems.map((item) => (
                                    <ListItem
                                        button
                                        key={item.text}
                                        onClick={handleDrawerClose}
                                        component={RouterLink}
                                        to={item.link}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </Box>
                    <Box sx={{display: {xs: "none", md: "flex"}}}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                color="inherit"
                                component={RouterLink}
                                to={item.link}
                                sx={{mx: 1}}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                    <div style={{flexGrow: 1}}/>
                    {username && (
                        <>
                            <Typography>{`Welcome, ${username}`}</Typography>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default CustomAppBar;