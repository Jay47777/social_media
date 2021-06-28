import {createSlice} from "@reduxjs/toolkit"

const initial = {
  user: [],
};


// export const reducer = (state = initial, { type, payload }) => {
//   switch (type) {
//     case "Add_data":
//       return { ...state, user: payload };
//     default:
//       return state;
//   }
// };
//  const userReducer = (state = initialUser, { type, payload }) => {
//   switch (type) {
//     case "Show_data":
//       return { ...state, userInfo: payload };
//     case "Add_Image":
//       return { ...state, image:payload };
//     default:
//       return state;
//   }
// };

const userReducer = createSlice({
  name:"user",
  initialState:initial,
  reducers:{
    addData:(state,action) =>{
      state.user = action.payload
    }
  }

});



export const {addData} = userReducer.actions;

//  userReducer.reducer;
export default userReducer.reducer;