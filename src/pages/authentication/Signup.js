import { useState } from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import {signup} from "../../utils/api";
import CustomAppbar from "../Styles/CustomAppbar";

function Signup() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            console.log("Please enter a valid username and password.");
            return;
        }
        try {
            const data = await signup(formData);
            console.log(data); // do something with the response data
            navigate('/login');
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
            <CustomAppbar/>
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
                        Sign up
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
                                    type="email"
                                    label="Email Address"
                                    name="email"
                                    value={formData.email}
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
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/login" variant="body2">
                                    Already have an account? Sign in
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

export default Signup;
