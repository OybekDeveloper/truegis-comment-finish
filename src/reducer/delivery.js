import { createSlice } from "@reduxjs/toolkit";
import { foods } from "../delivery-components/foods-image/foodsData";
export const initialState = {
  openMenu: false,
  openLang: false,
  selectCategory: false,
  selectCategoryItem: {},
  activeCatgory:foods[0],
  totalPrice:"",
  items:[]
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    OpenDeliveryMenu: (state, action) => {
      if (action.payload) {
        state.openMenu = action.payload;
      } else {
        state.openMenu = !state.openMenu;
      }
    },
    OpenLangMenu: (state, action) => {
      if (action.payload) {
        state.openLang = action.payload;
      } else state.openLang = !state.openLang;
    },
    SelectCategoryModal: (state, action) => {
      state.selectCategory = !state.selectCategory;
      state.selectCategoryItem = action.payload;
    },
    SelectCategoryActive:(state,action)=>{
      state.activeCatgory=action.payload;

    },
    AddProductItem:(state,action)=>{

    },
    MinusProductItem:(state,action)=>{

    }
  },
});

export const {SelectCategoryActive, OpenDeliveryMenu, OpenLangMenu, SelectCategoryModal } =
  deliverySlice.actions;
export default deliverySlice.reducer;
