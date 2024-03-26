import { createSlice } from "@reduxjs/toolkit"

export const initialState={
    placeData:[],
    commentData:[],
    delModal:false,
    deleteId:'',
    editId:''
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
        },
        DeleteComment:(state,action)=>{
            state.deleteId=action.payload
        },
        EditCommentModal:(state,action)=>{
            state.editId=action.payload
        }
    }
})

export const {GetPlaceData,GetCommentData,ActiveModal,DeleteComment,EditCommentModal} = eventSlice.actions;
export default eventSlice.reducer;