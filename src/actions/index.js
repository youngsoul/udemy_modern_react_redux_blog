import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
export const ROOT_URL = 'https://reduxblog.herokuapp.com/api';
export const API_KEY = '?key=bluelobsterstudios';
//export const API_KEY = '?key=PAPERCLIP12345';
export const CREATE_POST = 'create_post';


export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback) {

    // this will automatically navigate the user back to the main page
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,values)
        .then( () => callback());

    return {
        type: CREATE_POST,
        payload: request
    };

}

export function fetchPost(post_id) {

    const request = axios.get(`${ROOT_URL}/posts/${post_id}${API_KEY}`);
    return {
        type: FETCH_POST,
        payload: request
    };

}

export function deletePost(post_id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${post_id}${API_KEY}`)
        .then( () => callback());
    return {
        type: FETCH_POST,
        payload: post_id
    };

}