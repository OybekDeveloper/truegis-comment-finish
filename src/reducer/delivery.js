import { createSlice } from "@reduxjs/toolkit";
import { foods } from "../delivery-components/foods-image/foodsData";
export const initialState = {
  openMenu: false,
  openLang: false,
  selectCategory: false,
  selectCategoryItem: {},
  activeCatgory: foods[0],
  totalPrice: "",
  items: [],
  foods: foods,
  sendOrder: false,
  deleteFood: false,
  exitUser:false,
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
    SelectCategoryActive: (state, action) => {
      state.activeCatgory = action.payload;
      state.selectCategory = false;
    },
    AddProductItem: (state, action) => {
      if (action.payload) {
        const [foodId, categoryId] = action.payload;

        // Find the category object by categoryId
        const categoryIndex = state.foods.findIndex(
          (food) => food.food_id === categoryId
        );

        if (categoryIndex > -1) {
          const category = state.foods[categoryIndex];
          const findItemIndex = category.props.findIndex(
            (item) => item.id === foodId
          );

          if (findItemIndex !== -1) {
            // If item exists, increment its quantity
            const updatedFoods = state.foods.map((food, index) => {
              if (index === categoryIndex) {
                const updatedProps = food.props.map((item, itemIndex) => {
                  if (itemIndex === findItemIndex) {
                    return {
                      ...item,
                      quantity: item.quantity + 1,
                    };
                  }
                  return item;
                });

                return {
                  ...food,
                  props: updatedProps,
                };
              }
              return food;
            });

            return {
              ...state,
              foods: updatedFoods,
            };
          } else {
            // If item doesn't exist, add it with quantity 1
            const newItem = {
              id: foodId,
              quantity: 1,
            };

            const updatedProps = [...category.props, newItem];

            const updatedFoods = state.foods.map((food, index) => {
              if (index === categoryIndex) {
                return {
                  ...food,
                  props: updatedProps,
                };
              }
              return food;
            });

            return {
              ...state,
              foods: updatedFoods,
            };
          }
        }
      }

      // Return the current state if action payload is invalid or no changes are made
      return state;
    },

    MinusProductItem: (state, action) => {},
    SendOrderItem: (state, action) => {
        state.sendOrder = action.payload;
    },
    DeleteFoodItem: (state, action) => {
      state.deleteFood = action.payload;
    },
    ExitUserModal:(state,action) => {
      state.exitUser=action.payload
    }
  },
});

export const {
  SelectCategoryActive,
  OpenDeliveryMenu,
  OpenLangMenu,
  SelectCategoryModal,
  AddProductItem,
  MinusProductItem,
  SendOrderItem,
  DeleteFoodItem,
  ExitUserModal
} = deliverySlice.actions;
export default deliverySlice.reducer;
