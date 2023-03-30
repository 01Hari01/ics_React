import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import CustomAppbar from "../Styles/CustomAppbar";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isLoggedIn, setIsLoggedIn] = useState(true);
// ...
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            console.log("Please enter a valid username and password.");
            return;
        }
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/login/`, formData);
            console.log("inside api call", response);
            if (response.status === 200) {
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("username", response.data.username);
                navigate("/suppliers");
            }
            else{
                setIsLoggedIn(false)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (
        <>

            <CustomAppbar />
            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={7}
                    sx={{
                        backgroundImage: `url(${
                            process.env.PUBLIC_URL + "/assets/backgroundd.jpg"
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "100vh",
                    }}
                >
                    {/* background image */}
                </Grid>
                <Grid item xs={12} sm={8} md={5}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5" mb={3}>
                            Log in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="User Name"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="password"
                                        label="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Log In
                                    </Button>
                                    {isLoggedIn===false &&
                                        <Typography variant="body" gutterBottom sx={{ color: 'red' }}>
                                            Login Failed,Please Check your credentials!!
                                        </Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link component={RouterLink} to="/signup" variant="body2">
                                        Don't have an account? Sign up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Login;
