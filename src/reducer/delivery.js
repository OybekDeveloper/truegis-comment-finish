import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  openMenu: false,
  openLang: false,
  selectCategory: false,
  selectCategoryId: "",
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
      state.selectCategoryId = action.payload;
    },
  },
});

export const { OpenDeliveryMenu, OpenLangMenu, SelectCategoryModal } =
  deliverySlice.actions;
export default deliverySlice.reducer;
