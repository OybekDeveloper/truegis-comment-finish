import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  placeData: [],
  commentData: [],
  delModal: false,
  deleteId: "",
  editId: "",
  loading: false,
  savePlaceId: "",
  saveUserId: "",
  saveKm: "",
  lat: "",
  long: "",
  distance:"",
  deleteModal:false,
  deletePhotoId:"",
  isSave:false
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    GetPlaceData: (state, action) => {
      state.placeData = action.payload;
    },
    GetCommentData: (state, action) => {
      state.commentData = action.payload;
    },
    ActiveModal: (state, action) => {
      state.delModal = action.payload;
    },
    DeleteComment: (state, action) => {
      state.deleteId = action.payload;
    },
    EditCommentModal: (state, action) => {
      state.editId = action.payload;
    },
    Loading: (state, action) => {
      state.loading = true;
    },
    SavePathData: (state, action) => {
      if (action.payload) {
        state.savePlaceId = action.payload[0];
        state.saveUserId = action.payload[1];
        state.saveKm = action.payload[2];
      }
    },
    SaveLocation: (state, action) => {
      // if (action.payload) {
      //   state.lat = action.payload[0];
      //   state.long = action.payload[1];
      // }
    },
    SaveDistance:(state,action)=>{
      state.distance=action.payload
    },
    DeleteModalRedux:(state,action)=>{
      state.deleteModal=!state.deleteModal
      state.deletePhotoId=action.payload
    },
    SavePlaceModal:(state)=>{
      state.isSave=!state.isSave
    }
  },
});

export const {
  DeleteModalRedux,
  SaveDistance,
  SaveLocation,
  SavePathData,
  GetPlaceData,
  GetCommentData,
  ActiveModal,
  DeleteComment,
  EditCommentModal,
  Loading,
  SavePlaceModal
} = eventSlice.actions;
export default eventSlice.reducer;
