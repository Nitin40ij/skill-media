import classes from './LandingPage.module.css';
import { Grid, Box, Card, CardContent, Divider } from '@mui/material';
import Login from './Login';
import SignUpInitial from './SignUp/SignUpInitial';
import { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet';
const LandingPage = (props) => {
    const [openSignUp, setOpenSignUp] = useState(false);
    const handleOpenSignUp = () => {
        setOpenSignUp(true);
    };
    const handleCloseSignUp = () => {
        setOpenSignUp(false);
    };
    useEffect(()=>{
        const token = localStorage.getItem('myToken');
        if(token){
            // props.history.push("/skills");
        }
    },[])
    return (
        <div className={classes.landingPage}>
              {/* Adding React-Helmet for meta description on every Page See the title of each page */}
    
            {openSignUp && (
                <SignUpInitial open={openSignUp} onClose={handleCloseSignUp} />
            )}
            <Box
                sx={{
                    margin: 'auto',
                    width: '60%',
                    //   background:
                    //     "linear-gradient(90deg, #7d53de 32.2%, rgba(255, 255, 255, 0) 100%)",
                }}
            >
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3CfDXFQzyrzAn9uMQhypFHyC6vbXOjko_tw&usqp=CAU"
                            alt="blacc sckull Logo"
                            style={{
                                padding: 0,
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            width: '100%',
                            height: '100%',
                            margin: 0,
                            border: 0,
                            padding: 0,
                        }}>
                        <Card sx={{ width: '100%', margin: 0 }}>
                            <CardContent sx={{ justifyContent: 'center', color:"white", backgroundColor:"#1F1A24" }}>
                                <Login />
                                <Divider sx={{ my: 1 }} />
                                <Box textAlign="center">
                                    <button
                                        onClick={handleOpenSignUp}
                                        className="login-submit  add-new-account"
                                    > Create a New Account
                                    </button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default LandingPage;
