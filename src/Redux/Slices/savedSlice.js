import {createSlice  } from '@reduxjs/toolkit';

const initialState = {
    state : {
        error: false,
        isFetching: false,
        success: false,
    },
    saved:[],
}

const savedSlice = createSlice({
    name:'saved',
    initialState,
    reducers: {
     setIsFetching : (state) => {
            state.state.isFetching = true;
           },
    savedSuccess : (state,action) => {
        state.state.isFetching = false;
       state.saved.push(action.payload);
       state.state.success = false;
    },
    removeSaved : (state) => {
        state.saved = [];
        state.state.isFetching = false;
        state.state.success = false;
    },
    removesave : (state, action) => {
        state.saved.filter((save)=>{
         return save.id !== action.payload.id
        })

    }
    
    }
})

export const {
      setIsFetching,
      savedSuccess,
      removeSaved,
      removesave
      
    } = savedSlice.actions;
  
  export default savedSlice.reducer;