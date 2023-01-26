import React, {useState, useEffect}  from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import axios from 'axios';
//import jwt-decode from 'jwt-decode';

import memories from '../../images/gogo-dino.jpg';
import useStyles from './styles';

const Navbar =() => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //const user=null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        const token = user?.token;
        const result = user?.result;
        //console.log(token, result);
        //console.log(decode(token));
        var decodedToken ='';
         if(token){
            if(token.length < 500 && result?.sub !== undefined){
                decodedToken = axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
            }else{
                decodedToken = decode(token);
            }
            //console.log(decodedToken);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
         }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>

                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt="momories" height="60" width="60" align="center"/> 
            </div>
            <Toolbar className={classes.toolbar}>
                {user ?(
                    <div className={classes.profile}>
                        <Avatar className={classes.avatar} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography> 
                        <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button className={classes.logout} component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>

                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;