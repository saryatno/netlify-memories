import React, {useState} from 'react';
//import {Link,useHistory,useLocation} from 'react-router-dom';
import { Container,Grid,Avatar,Button,Typography, Paper } from '@material-ui/core';
//import { GoogleLogin } from 'react-google-login';  ///library for google login old method
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
//import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
//import jwt from 'jsonwebtoken';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import Icon from './icon';
import Input from './Input';
import {signin, signup} from '../../actions/auth.js';

import { LockOutlined } from '@material-ui/icons';

const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword :''}
const Auth = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    //var jwt = require("jsonwebtoken");
    
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(formData);
        if(isSignUp){
            dispatch(signup(formData,navigate));
        }else{
            dispatch(signin(formData,navigate));
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]:e.target.value});
        handleShowPassword(false);
    };
    const googleSuccess =  async (response) => {
        //const tokens = response?.access_token;
        //console.log(response);
        //console.log(jwt_decode(response));
        //const result = response?.clientId;
        const result = jwt_decode(response?.credential);       
        const token = response?.credential;
        //console.log(result);
        //console.log(token);        
        try {
            dispatch({type: 'AUTH', data : {result, token}});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = (error) => {
        console.log("Google Sign In was Unsuccessful. Try Again Later");
        console.log(error);
    };
    const login = useGoogleLogin({
        //onSuccess: credentialResponse => console.log(credentialResponse),
        //onSuccess: (TokenResponse )=> console.log(TokenResponse),
        //onSuccess: CodeResponse => console.log(CodeResponse),
        //onSuccess: googleSuccess,
        //flow: 'auth-code',
        //onError: googleFailure
        //flow: 'auth-code',
        onSuccess: async respose => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    }
                })

                //console.log(res);
                const result = res?.data; 
                const token = respose.access_token;
                //console.log(result);
                //console.log(token);
                dispatch({type: 'AUTH', data : {result, token}});
                navigate('/');
            } catch (err) {
                console.log(err)

            }
        }
      });
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevatation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">{isSignUp?'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignUp ? "Sign Up" : "Sign In" }
                    </Button>
                    {/* <GoogleLogin
                        clientId ="537857048018-t5cr4pitgnboajb4thiuj1t73vql7sm9.apps.googleusercontent.com"
                        render = {(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                    <GoogleLogin
                        //onSuccess={(response)=> console.log(response?.credential)}
                        onSuccess={googleSuccess}
                        onError={(error)=> console.log(error)}
                        logo_alignment = 'center'
                        type = 'standard'
                        />
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={login} startIcon={<Icon/>} variant="contained">Google Sign In</Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth