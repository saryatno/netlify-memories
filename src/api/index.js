import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})
//const url = 'https://tense-fly-sweatsuit.cyclic.app/posts';
//const url = 'http://localhost:5000/posts';
//const newPost = axios.request()
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        if(JSON.parse(localStorage.getItem('profile'))?.result?.sub === undefined){
            req.headers.Authorization = `Bearer 1 ${JSON.parse(localStorage.getItem('profile')).token}`;
        } else {
            req.headers.Authorization = `Bearer 2 ${JSON.parse(localStorage.getItem('profile')).token}`;
        }
    }
    //console.log(JSON.parse(localStorage.getItem('profile'))?.result?.sub);
    //console.log(req.headers);
    return req;
});


export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
