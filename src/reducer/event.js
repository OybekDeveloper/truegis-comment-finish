import { createSlice } from "@reduxjs/toolkit"

export const initialState={
    placeData:[],
    commentData:[]
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
        }
    }
})

export const {GetPlaceData,GetCommentData} = eventSlice.actions;
export default eventSlice.reducer;