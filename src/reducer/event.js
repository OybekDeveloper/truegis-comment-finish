import { createSlice } from "@reduxjs/toolkit"

export const initialState={
    placeData:[],
    commentData:[],
    delModal:false
}

export const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers:{
        GetPlaceData:(state,action)=>{
            state.placeData=action.payload
        },
        GetCommentData:(state,action)=>{
            state.commentData=action.payload
        },
        ActiveModal:(state,action)=>{
            state.delModal=action.payload
        }
    }
})

export const {GetPlaceData,GetCommentData,ActiveModal} = eventSlice.actions;
export default eventSlice.reducer;