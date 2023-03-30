import { Link as RouterLink } from 'react-router-dom';
import {AppBar, Box, Button,Link, Toolbar, Typography} from '@mui/material';

function LandingPage() {
    return (
        <>
            <AppBar position="static"  elevation={0}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link component={RouterLink} to="/" underline="none" color="inherit">
                            <Typography variant="h6" noWrap>
                               ICS
                            </Typography>
                        </Link>
                    </Box>
                    <Button component={RouterLink} to="/login" color="inherit" sx={{ mr: 1 }}>
                        Login
                    </Button>
                    <Button component={RouterLink} to="/signup" variant="contained" color="primary">
                        Signup
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ height: '100vh', overflow: 'hidden' }}>
                <img src={process.env.PUBLIC_URL + '/assets/landingbg.jpg'} alt="Landing Page" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>

                </Box>
            </Box>
        </>
    );
}
export default LandingPage;