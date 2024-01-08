import { createSlice } from "@reduxjs/toolkit";


//the following state will be stored in the global state, this data can be grabbed throughtout the entire application

const initialState = {
    mode: "light",
    user:null,
    token:null,
    posts: [],
} //this data will be stored in localstate, if the user closes the browser the info will still be stored

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers :{ // reducers are kinda functions
        
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"; 
        },

        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => { // here I'm reseting the states when loginOut
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user && action.payload){
state.user.friends = action.payload.friends;
            }else{
console.error("user friends non-existent :(")
            }
        },
        setPosts: (state, action) =>{
            console.log("setPosts action dispatched with data:", action.payload.posts);
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            if (action.payload && action.payload.post) {
                const updatedPosts = state.posts.map((post) => 
                  post._id === action.payload.post._id ? action.payload.post : post
                );
                state.posts = updatedPosts;
              } else {
                console.error("Error updating post");
              }
        }
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;