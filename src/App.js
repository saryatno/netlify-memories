import React from 'react'; //, { useState, useEffect } 
import { Container } from '@material-ui/core';//AppBar, Typography,  //, Grow, Grid 
//import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

//import { getPosts } from './actions/posts';
//import memories from './images/gogo-dino.jpg';
//import Form from './components/Form/Form.js';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

//import Posts from './components/Posts/Posts.js';
//import useStyles from './styles';

const App = () =>{
/*  const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    },[currentId, dispatch]);
  */  
    return (
    <GoogleOAuthProvider clientId ="537857048018-t5cr4pitgnboajb4thiuj1t73vql7sm9.apps.googleusercontent.com">
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar/>
                <Routes>
                    <Route path="/"  element={<Home/>} />
                    <Route path="/auth"  element={<Auth/>} />
                </Routes>
                
                {/* <AppBar className={classes.appBar} position='static' color='inherit'>
                    <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
                    <img className={classes.image} src={memories} alt="momories" height="60" width="60" align="center"/> 
                </AppBar> */}
                {/* <Grow in>
                    <Container>
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                    <Posts setCurrentId = {setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                                <Form currentId = {currentId} setCurrentId = {setCurrentId} />
                            </Grid>
                            </Grid>
                            </Container>
                        </Grow> */}
            </Container>
        </BrowserRouter>    
    </GoogleOAuthProvider>

    )
}

export default App;