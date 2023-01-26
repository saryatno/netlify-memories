import React,  { useState, useEffect } from 'react';
import { Container,Grow, Grid} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Form from '../Form/Form.js';
import Posts from '../Posts/Posts.js';
//import useStyles from './styles';

const Home = () => {
    
    const [currentId, setCurrentId] = useState(null);
    //const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    //const classes = useStyles();

    useEffect(() => {
        dispatch(getPosts());
    },[currentId, dispatch]);

    //className={classes.mainContainer} 
    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId = {setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId = {currentId} setCurrentId = {setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
        ) 
}

export default Home;