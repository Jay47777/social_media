import {createSlice} from "@reduxjs/toolkit";

const initialUser = {
    userInfo: {
      username: "jay", email: "jaykarasariya@gmail.com",image:"" 
      // { username: "dhrupal", email: "jaykarasariya@gmail.com",image:"" },
  },
  };


const infoReducer = createSlice({
    name:"user",
    initialState:initialUser,
    reducers:{
      showData:(state,action) => {
        state = action.payload
      },
      addImage:(state,action) => {
        state.userInfo.image = action.payload
      }
    }
  
  });


  export const {showData,addImage} = infoReducer.actions;

  export default infoReducer.reducer;