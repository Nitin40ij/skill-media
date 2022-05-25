import { Box, Typography, TextField, Grid, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from '../../../store/asyncMethods/AuthMethods';
import toast, { Toaster } from "react-hot-toast";
// import { Helmet } from 'react-helmet';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: 6,
    // p: 4,
};

export default function SignUpForm(props) {

    //First Name
    const [firstName, setFirstName] = useState('');
    const firstNameOnChangeHandler = (event) => {
        setFirstName(event.target.value);
    };

    //Last Name
    const [lastName, setLastName] = useState('');
    const lastNameOnChangeHandler = (event) => {
        setLastName(event.target.value);
    };

    //Gender
    const [gender, setGender] = useState();
    const genderOnChangeHandler = (event) => {
        setGender(event.target.value);
    };

    //Date of Birth
    const [birthdate, setBirthDate] = useState(null);
    const birthDateOnChangeHandler = (newValue) => {
        setBirthDate(newValue);
    };

    //Validation of user's legal age can be added here

    //Username
    const [username, setUsername] = useState('');
    const usernameOnChangeHandler = (event) => {
        setUsername(event.target.value);
    };

    //Password
    const [password, setPassword] = useState('');
    const passwordOnChangeHandler = (event) => {
        console.log(password);
        setPassword(event.target.value);
    };

    //Confirm Password
    const [confirmPassword, setConfirmPassword] = useState('');
    const confirmPasswordOnChangeHandler = (event) => {
        setConfirmPassword(event.target.value);
    };
    //password and confirmPassword Validation
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    // setting up dispatch function
    const dispatch = useDispatch();
    // Getting loading and errors from Global state(AuthReducer)
    const { loading, email, registerErrors, user, phone, type } = useSelector(state => state.AuthReducer);
    //Form Submit
    const signUpFormSubmitHandler = async (event) => {
        event.preventDefault();
        // if (password.length > 0 && confirmPassword.length > 0 && password === confirmPassword) {
        //     setPasswordsMatch(true);
        // } else {
        //     setPasswordsMatch(false);
        //     console.log("ASDADADa");
        //     registerErrors.push({ msg: "Confirm password did not match with password" })
        // }
        console.log(confirmPassword);
        dispatch(postRegister(firstName, lastName, gender, birthdate, confirmPassword, password, username, email, type));
    };
    useEffect(() => {
        if (registerErrors.length !== 0) {
            console.log(registerErrors);
            registerErrors.map(error => {
                toast.error(error.msg)
            })
        }
        if (user) {
            props.history.push("/skills")
        }
    }, [registerErrors, user])
    return (
        <Box
            sx={{
                background:
                    'linear-gradient( 90deg, #424242 32.2%, rgba(255, 255, 255, 0.74) 100% )',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0',
                left: '0',
                paddingTop: '30px',
            }}
        >
            {/* React Toaster for viewing Errors  */}
            <Toaster position='top-right' reverseOrder={false} toastOptions={{ style: { marginTop: '50px' } }} />
            {/* Adding React-Helmet for meta description on every Page See the title of each page */}
            {/* <Helmet>
                <title>Blacc Sckull</title>
                <meta name="description" content='Learn skills while surfing' />
            </Helmet> */}
            <Box
                sx={style}
                component="form"
                onSubmit={signUpFormSubmitHandler}
                noValidate
            >
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ textAlign: 'center' }}
                >
                    Sign Up
                </Typography>
                <Typography
                    component="h2"
                    variant="subtitle1"
                    sx={{ mb: 2, textAlign: 'center' }}
                >
                    Fill up this form to complete your account details
                </Typography>
                <Grid container spacing={1.3}>
                    {' '}
                    {/*for spacing between input blocks*/}
                    <Grid item xs={6}>
                        <TextField
                            label="First Name"
                            autoComplete="given-name"
                            value={firstName}
                            onChange={firstNameOnChangeHandler}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Last Name"
                            autoComplete="family-name"
                            value={lastName}
                            onChange={lastNameOnChangeHandler}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sx={{}}>
                        <Box
                            sx={{
                                border: '1px solid lightgray',
                                borderRadius: '5px',
                                py: 0.5,
                                pl: 1,
                            }}
                        >
                            <FormControl component="fieldset" item xs={12}>
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    sx={{}}
                                    value={gender}
                                    onChange={genderOnChangeHandler}
                                >
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="other"
                                        control={<Radio />}
                                        label="Other"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Birth"
                                value={birthdate}
                                onChange={birthDateOnChangeHandler}
                                maxDate={new Date()}
                                renderInput={(params) => (
                                    <TextField fullWidth {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={usernameOnChangeHandler}
                            autoComplete="username"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={passwordOnChangeHandler}
                            autoComplete="new-password"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            error={passwordsMatch}
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={confirmPasswordOnChangeHandler}
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained">
                            {loading ? "..." : "Submit"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
